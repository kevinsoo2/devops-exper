const express = require('express');
const { getDb } = require('../db/connection');

const router = express.Router();

// GET /api/blog - List posts
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const { category, featured } = req.query;

    let sql = 'SELECT * FROM posts WHERE is_published = 1';
    const args = [];

    if (category) {
      sql += ' AND category = ?';
      args.push(category);
    }
    if (featured === 'true') {
      sql += ' AND is_featured = 1';
    }

    sql += ' ORDER BY published_at DESC';

    const result = await db.execute({ sql, args });
    res.json({ posts: result.rows });
  } catch (error) {
    console.error('Blog list error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des articles' });
  }
});

// GET /api/blog/:slug
router.get('/:slug', async (req, res) => {
  try {
    const db = getDb();
    const result = await db.execute({
      sql: 'SELECT * FROM posts WHERE slug = ? AND is_published = 1',
      args: [req.params.slug]
    });

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Article non trouvé' });
    }

    res.json({ post: result.rows[0] });
  } catch (error) {
    console.error('Blog detail error:', error);
    res.status(500).json({ error: 'Erreur' });
  }
});

// POST /api/blog/subscribe - Newsletter
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Email invalide' });
    }

    const db = getDb();
    await db.execute({
      sql: 'INSERT OR IGNORE INTO subscribers (email) VALUES (?)',
      args: [email]
    });

    res.status(201).json({ message: 'Inscription à la newsletter réussie!' });
  } catch (error) {
    console.error('Subscribe error:', error);
    res.status(500).json({ error: 'Erreur lors de l\'inscription' });
  }
});

module.exports = router;
