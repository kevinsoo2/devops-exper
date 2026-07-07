const express = require('express');
const { getDb } = require('../db/connection');

const router = express.Router();

// GET /api/stats - Public platform stats
router.get('/', async (req, res) => {
  try {
    const db = getDb();

    const [users, courses, labs, completions] = await Promise.all([
      db.execute('SELECT COUNT(*) as count FROM users'),
      db.execute('SELECT COUNT(*) as count, SUM(duration_hours) as total_hours FROM courses WHERE is_published = 1'),
      db.execute('SELECT COUNT(*) as count FROM labs WHERE is_published = 1'),
      db.execute('SELECT COUNT(*) as count FROM lab_completions WHERE completed_at IS NOT NULL')
    ]);

    res.json({
      stats: {
        total_students: users.rows[0].count || 15000,
        total_hours: courses.rows[0].total_hours || 200,
        total_labs: labs.rows[0].count || 50,
        success_rate: 95,
        total_completions: completions.rows[0].count || 0
      }
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Erreur' });
  }
});

// GET /api/stats/roadmap - Roadmap items
router.get('/roadmap', async (req, res) => {
  try {
    const db = getDb();
    const { level } = req.query;

    let sql = 'SELECT * FROM roadmap_items';
    const args = [];

    if (level && level !== 'all') {
      sql += ' WHERE level = ?';
      args.push(level);
    }

    sql += ' ORDER BY order_index';

    const result = await db.execute({ sql, args });
    res.json({ roadmap: result.rows });
  } catch (error) {
    console.error('Roadmap error:', error);
    res.status(500).json({ error: 'Erreur' });
  }
});

module.exports = router;
