const express = require('express');
const { getDb } = require('../db/connection');

const router = express.Router();

// GET /api/tools - List all tools
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const { category } = req.query;

    let sql = 'SELECT * FROM tools';
    const args = [];

    if (category && category !== 'all') {
      sql += ' WHERE category = ?';
      args.push(category);
    }

    sql += ' ORDER BY popularity DESC';

    const result = await db.execute({ sql, args });
    res.json({ tools: result.rows });
  } catch (error) {
    console.error('Tools list error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des outils' });
  }
});

module.exports = router;
