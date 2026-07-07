const express = require('express');
const { getDb } = require('../db/connection');

const router = express.Router();

// GET /api/tools - List tools with filters
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const db = getDb();

    let sql = 'SELECT id, name, slug, description, short_description, category, icon_url, docs_url, github_url, alternatives, use_cases, is_popular FROM tools';
    const args = [];

    if (category) {
      sql += ' WHERE category = ?';
      args.push(category);
    }

    sql += ' ORDER BY is_popular DESC, name ASC';

    const result = await db.execute({ sql, args });

    // Get unique categories
    const categoriesResult = await db.execute('SELECT DISTINCT category FROM tools ORDER BY category');

    res.json({
      tools: result.rows,
      categories: categoriesResult.rows.map(r => r.category)
    });
  } catch (error) {
    console.error('List tools error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des outils' });
  }
});

// GET /api/tools/:slug - Get tool by slug
router.get('/:slug', async (req, res) => {
  try {
    const db = getDb();
    const { slug } = req.params;

    const result = await db.execute({
      sql: 'SELECT * FROM tools WHERE slug = ?',
      args: [slug]
    });

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Outil non trouvé' });
    }

    res.json({ tool: result.rows[0] });
  } catch (error) {
    console.error('Get tool error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'outil' });
  }
});

module.exports = router;
