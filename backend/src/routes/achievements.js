const express = require('express');
const { getDb } = require('../db/connection');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// GET /api/achievements - List all achievements
router.get('/', async (req, res) => {
  try {
    const db = getDb();

    const result = await db.execute(
      'SELECT * FROM achievements ORDER BY rarity DESC, category, condition_value ASC'
    );

    res.json({ achievements: result.rows });
  } catch (error) {
    console.error('List achievements error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des achievements' });
  }
});

// GET /api/achievements/mine - Get user achievements (earned + total)
router.get('/mine', authenticate, async (req, res) => {
  try {
    const db = getDb();
    const userId = req.user.id;

    // Get earned achievements
    const earnedResult = await db.execute({
      sql: `SELECT a.*, ua.earned_at FROM user_achievements ua JOIN achievements a ON ua.achievement_id = a.id WHERE ua.user_id = ? ORDER BY ua.earned_at DESC`,
      args: [userId]
    });

    // Get total achievements count
    const totalResult = await db.execute('SELECT COUNT(*) as total FROM achievements');

    // Get achievements by rarity
    const rarityResult = await db.execute({
      sql: `SELECT a.rarity, COUNT(*) as total, SUM(CASE WHEN ua.user_id = ? THEN 1 ELSE 0 END) as earned FROM achievements a LEFT JOIN user_achievements ua ON a.id = ua.achievement_id AND ua.user_id = ? GROUP BY a.rarity`,
      args: [userId, userId]
    });

    res.json({
      earned: earnedResult.rows,
      total: totalResult.rows[0].total,
      earned_count: earnedResult.rows.length,
      by_rarity: rarityResult.rows
    });
  } catch (error) {
    console.error('Get my achievements error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de vos achievements' });
  }
});

// Check and award achievements for a user
async function checkAchievements(userId) {
  const db = getDb();

  try {
    // Get all achievements
    const achievements = await db.execute('SELECT * FROM achievements');

    // Get user stats
    const [lessonsCompleted, coursesCompleted, labsCompleted, quizzesPassed, threadsCreated, streakDays, certsPassedResult] = await Promise.all([
      db.execute({ sql: 'SELECT COUNT(*) as count FROM lesson_progress WHERE user_id = ? AND completed = 1', args: [userId] }),
      db.execute({ sql: "SELECT COUNT(*) as count FROM enrollments WHERE user_id = ? AND status = 'completed'", args: [userId] }),
      db.execute({ sql: "SELECT COUNT(*) as count FROM lab_completions WHERE user_id = ? AND status = 'completed'", args: [userId] }),
      db.execute({ sql: 'SELECT COUNT(*) as count FROM quiz_attempts WHERE user_id = ? AND passed = 1', args: [userId] }),
      db.execute({ sql: 'SELECT COUNT(*) as count FROM forum_threads WHERE user_id = ?', args: [userId] }),
      db.execute({ sql: 'SELECT streak_days FROM users WHERE id = ?', args: [userId] }),
      db.execute({ sql: "SELECT COUNT(*) as count FROM cert_progress WHERE user_id = ? AND status = 'passed'", args: [userId] })
    ]);

    const stats = {
      lessons_completed: lessonsCompleted.rows[0].count,
      courses_completed: coursesCompleted.rows[0].count,
      labs_completed: labsCompleted.rows[0].count,
      quizzes_passed: quizzesPassed.rows[0].count,
      threads_created: threadsCreated.rows[0].count,
      streak_days: streakDays.rows[0]?.streak_days || 0,
      certs_passed: certsPassedResult.rows[0].count
    };

    // Get already earned achievements
    const earnedResult = await db.execute({
      sql: 'SELECT achievement_id FROM user_achievements WHERE user_id = ?',
      args: [userId]
    });
    const earnedIds = new Set(earnedResult.rows.map(r => r.achievement_id));

    // Check each achievement
    const newAchievements = [];
    for (const achievement of achievements.rows) {
      if (earnedIds.has(achievement.id)) continue;

      const statValue = stats[achievement.condition_type] || 0;
      if (statValue >= achievement.condition_value) {
        // Award achievement
        await db.execute({
          sql: 'INSERT OR IGNORE INTO user_achievements (user_id, achievement_id) VALUES (?, ?)',
          args: [userId, achievement.id]
        });

        // Award XP
        await db.execute({
          sql: 'UPDATE users SET xp_points = xp_points + ? WHERE id = ?',
          args: [achievement.xp_reward, userId]
        });

        newAchievements.push(achievement);
      }
    }

    return newAchievements;
  } catch (error) {
    console.error('Check achievements error:', error);
    return [];
  }
}

module.exports = router;
module.exports.checkAchievements = checkAchievements;
