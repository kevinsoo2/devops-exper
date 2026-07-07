const express = require('express');
const { getDb } = require('../db/connection');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// GET /api/progress - Get user progress summary
router.get('/', authenticate, async (req, res) => {
  try {
    const db = getDb();
    const userId = req.user.id;

    // Enrollments
    const enrollments = await db.execute({
      sql: `SELECT e.*, c.title, c.slug, c.category, c.image_url FROM enrollments e JOIN courses c ON e.course_id = c.id WHERE e.user_id = ? ORDER BY e.enrolled_at DESC`,
      args: [userId]
    });

    // Lab completions
    const labs = await db.execute({
      sql: `SELECT lc.*, l.title, l.slug, l.category, l.difficulty FROM lab_completions lc JOIN labs l ON lc.lab_id = l.id WHERE lc.user_id = ? ORDER BY lc.started_at DESC`,
      args: [userId]
    });

    // Cert progress
    const certs = await db.execute({
      sql: `SELECT cp.*, c.name, c.slug, c.provider FROM cert_progress cp JOIN certifications c ON cp.certification_id = c.id WHERE cp.user_id = ? ORDER BY cp.started_at DESC`,
      args: [userId]
    });

    // Quiz attempts
    const quizzes = await db.execute({
      sql: `SELECT qa.*, q.title, q.slug, q.category FROM quiz_attempts qa JOIN quizzes q ON qa.quiz_id = q.id WHERE qa.user_id = ? ORDER BY qa.attempted_at DESC`,
      args: [userId]
    });

    // Achievements
    const achievements = await db.execute({
      sql: `SELECT ua.earned_at, a.* FROM user_achievements ua JOIN achievements a ON ua.achievement_id = a.id WHERE ua.user_id = ? ORDER BY ua.earned_at DESC`,
      args: [userId]
    });

    // Stats summary
    const completedCourses = enrollments.rows.filter(e => e.status === 'completed').length;
    const completedLabs = labs.rows.filter(l => l.status === 'completed').length;
    const passedQuizzes = quizzes.rows.filter(q => q.passed).length;
    const passedCerts = certs.rows.filter(c => c.status === 'passed').length;

    res.json({
      progress: {
        enrollments: enrollments.rows,
        labs: labs.rows,
        certifications: certs.rows,
        quizzes: quizzes.rows,
        achievements: achievements.rows
      },
      stats: {
        courses_enrolled: enrollments.rows.length,
        courses_completed: completedCourses,
        labs_started: labs.rows.length,
        labs_completed: completedLabs,
        quizzes_taken: quizzes.rows.length,
        quizzes_passed: passedQuizzes,
        certs_studying: certs.rows.length,
        certs_passed: passedCerts,
        achievements_earned: achievements.rows.length,
        xp_points: req.user.xp_points,
        level: req.user.level
      }
    });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de la progression' });
  }
});

// POST /api/progress/lessons/:id/complete - Complete a lesson
router.post('/lessons/:id/complete', authenticate, async (req, res) => {
  try {
    const db = getDb();
    const lessonId = parseInt(req.params.id);
    const userId = req.user.id;

    // Check lesson exists
    const lessonResult = await db.execute({
      sql: 'SELECT l.*, c.course_id FROM lessons l JOIN chapters c ON l.chapter_id = c.id WHERE l.id = ?',
      args: [lessonId]
    });

    if (lessonResult.rows.length === 0) {
      return res.status(404).json({ error: 'Leçon non trouvée' });
    }

    const lesson = lessonResult.rows[0];

    // Check if already completed
    const existingResult = await db.execute({
      sql: 'SELECT id FROM lesson_progress WHERE user_id = ? AND lesson_id = ? AND completed = 1',
      args: [userId, lessonId]
    });

    if (existingResult.rows.length > 0) {
      return res.status(409).json({ error: 'Leçon déjà complétée' });
    }

    // Mark as completed
    await db.execute({
      sql: 'INSERT OR REPLACE INTO lesson_progress (user_id, lesson_id, completed, completed_at) VALUES (?, ?, 1, CURRENT_TIMESTAMP)',
      args: [userId, lessonId]
    });

    // Award XP
    const xpReward = lesson.xp_reward || 10;
    await db.execute({
      sql: 'UPDATE users SET xp_points = xp_points + ? WHERE id = ?',
      args: [xpReward, userId]
    });

    // Update enrollment progress
    const courseId = lesson.course_id;
    const totalLessons = await db.execute({
      sql: 'SELECT COUNT(*) as total FROM lessons l JOIN chapters c ON l.chapter_id = c.id WHERE c.course_id = ?',
      args: [courseId]
    });

    const completedLessons = await db.execute({
      sql: 'SELECT COUNT(*) as completed FROM lesson_progress lp JOIN lessons l ON lp.lesson_id = l.id JOIN chapters c ON l.chapter_id = c.id WHERE c.course_id = ? AND lp.user_id = ? AND lp.completed = 1',
      args: [courseId, userId]
    });

    const progressPercent = (completedLessons.rows[0].completed / totalLessons.rows[0].total) * 100;

    await db.execute({
      sql: 'UPDATE enrollments SET progress_percent = ? WHERE user_id = ? AND course_id = ?',
      args: [progressPercent, userId, courseId]
    });

    // Check if course is completed
    if (progressPercent >= 100) {
      await db.execute({
        sql: "UPDATE enrollments SET status = 'completed', completed_at = CURRENT_TIMESTAMP WHERE user_id = ? AND course_id = ?",
        args: [userId, courseId]
      });
    }

    res.json({
      message: 'Leçon complétée !',
      xp_earned: xpReward,
      progress_percent: progressPercent
    });
  } catch (error) {
    console.error('Complete lesson error:', error);
    res.status(500).json({ error: 'Erreur lors de la complétion de la leçon' });
  }
});

module.exports = router;
