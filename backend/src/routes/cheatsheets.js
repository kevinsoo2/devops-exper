const express = require('express');
const { getDb } = require('../db/connection');
const router = express.Router();

// GET /api/cheatsheets - List all cheat sheets
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const { category } = req.query;
    let sql = 'SELECT id, title, slug, description, category, icon, difficulty, tags, view_count FROM cheatsheets WHERE is_published = 1';
    const args = [];
    if (category && category !== 'all') { sql += ' AND category = ?'; args.push(category); }
    sql += ' ORDER BY category, title';
    const result = await db.execute({ sql, args });
    res.json({ cheatsheets: result.rows });
  } catch (error) {
    res.status(500).json({ error: 'Erreur' });
  }
});

// GET /api/cheatsheets/:slug - Get single cheat sheet with full content
router.get('/:slug', async (req, res) => {
  try {
    const db = getDb();
    const result = await db.execute({ sql: 'SELECT * FROM cheatsheets WHERE slug = ? AND is_published = 1', args: [req.params.slug] });
    if (result.rows.length === 0) return res.status(404).json({ error: 'Fiche non trouvée' });
    // Increment view count
    await db.execute({ sql: 'UPDATE cheatsheets SET view_count = view_count + 1 WHERE slug = ?', args: [req.params.slug] });
    res.json({ cheatsheet: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Erreur' });
  }
});

module.exports = router;
