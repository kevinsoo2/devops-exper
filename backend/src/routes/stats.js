const express = require('express');
const { getDb } = require('../db/connection');

const router = express.Router();

// GET /api/stats - Get platform statistics
router.get('/', async (req, res) => {
  try {
    const db = getDb();

    const [users, courses, labs, tools, certifications, posts, threads] = await Promise.all([
      db.execute('SELECT COUNT(*) as count FROM users'),
      db.execute('SELECT COUNT(*) as count FROM courses WHERE is_published = 1'),
      db.execute('SELECT COUNT(*) as count FROM labs WHERE is_published = 1'),
      db.execute('SELECT COUNT(*) as count FROM tools'),
      db.execute('SELECT COUNT(*) as count FROM certifications'),
      db.execute('SELECT COUNT(*) as count FROM posts WHERE is_published = 1'),
      db.execute('SELECT COUNT(*) as count FROM forum_threads')
    ]);

    res.json({
      stats: {
        users: users.rows[0].count,
        courses: courses.rows[0].count,
        labs: labs.rows[0].count,
        tools: tools.rows[0].count,
        certifications: certifications.rows[0].count,
        posts: posts.rows[0].count,
        threads: threads.rows[0].count
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des statistiques' });
  }
});

// GET /api/stats/roadmap - Get roadmap items with level filter
router.get('/roadmap', async (req, res) => {
  try {
    const { level } = req.query;
    const db = getDb();

    let sql = 'SELECT * FROM roadmap_items';
    const args = [];

    if (level) {
      sql += ' WHERE level = ?';
      args.push(level);
    }

    sql += ' ORDER BY order_index ASC';

    const result = await db.execute({ sql, args });

    res.json({ roadmap: result.rows });
  } catch (error) {
    console.error('Get roadmap error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du roadmap' });
  }
});

module.exports = router;
