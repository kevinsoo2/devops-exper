const express = require('express');
const { getDb } = require('../db/connection');

const router = express.Router();

// GET /api/leaderboard - Get top 50 users by XP
router.get('/', async (req, res) => {
  try {
    const db = getDb();

    const result = await db.execute(
      `SELECT id, username, full_name, avatar_url, xp_points, level, streak_days 
       FROM users 
       ORDER BY xp_points DESC 
       LIMIT 50`
    );

    const leaderboard = result.rows.map((user, index) => ({
      rank: index + 1,
      ...user
    }));

    res.json({ leaderboard });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du leaderboard' });
  }
});

module.exports = router;
