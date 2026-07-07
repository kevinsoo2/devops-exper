const express = require('express');
const { getDb } = require('../db/connection');
const { z } = require('zod');

const router = express.Router();

const subscribeSchema = z.object({
  email: z.string().email('Email invalide'),
  name: z.string().optional()
});

// GET /api/blog - List blog posts with filters
router.get('/', async (req, res) => {
  try {
    const { category, featured, tag, page = 1, limit = 10 } = req.query;
    const db = getDb();

    let sql = 'SELECT p.id, p.title, p.slug, p.excerpt, p.category, p.tags, p.cover_image, p.is_featured, p.view_count, p.like_count, p.published_at, u.username as author_name, u.avatar_url as author_avatar FROM posts p LEFT JOIN users u ON p.author_id = u.id WHERE p.is_published = 1';
    const args = [];

    if (category) {
      sql += ' AND p.category = ?';
      args.push(category);
    }
    if (featured === 'true') {
      sql += ' AND p.is_featured = 1';
    }
    if (tag) {
      sql += ' AND p.tags LIKE ?';
      args.push(`%${tag}%`);
    }

    sql += ' ORDER BY p.is_featured DESC, p.published_at DESC';

    const offset = (parseInt(page) - 1) * parseInt(limit);
    sql += ' LIMIT ? OFFSET ?';
    args.push(parseInt(limit), offset);

    const result = await db.execute({ sql, args });

    // Get total count
    let countSql = 'SELECT COUNT(*) as total FROM posts WHERE is_published = 1';
    const countArgs = [];
    if (category) { countSql += ' AND category = ?'; countArgs.push(category); }
    if (featured === 'true') { countSql += ' AND is_featured = 1'; }
    if (tag) { countSql += ' AND tags LIKE ?'; countArgs.push(`%${tag}%`); }

    const countResult = await db.execute({ sql: countSql, args: countArgs });
    const total = countResult.rows[0].total;

    res.json({
      posts: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('List blog error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des articles' });
  }
});

// GET /api/blog/:slug - Get blog post (increment view_count)
router.get('/:slug', async (req, res) => {
  try {
    const db = getDb();
    const { slug } = req.params;

    // Increment view count
    await db.execute({
      sql: 'UPDATE posts SET view_count = view_count + 1 WHERE slug = ?',
      args: [slug]
    });

    const result = await db.execute({
      sql: 'SELECT p.*, u.username as author_name, u.full_name as author_full_name, u.avatar_url as author_avatar, u.bio as author_bio FROM posts p LEFT JOIN users u ON p.author_id = u.id WHERE p.slug = ? AND p.is_published = 1',
      args: [slug]
    });

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Article non trouvé' });
    }

    res.json({ post: result.rows[0] });
  } catch (error) {
    console.error('Get blog post error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'article' });
  }
});

// POST /api/blog/subscribe - Subscribe to newsletter
router.post('/subscribe', async (req, res) => {
  try {
    const validation = subscribeSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors[0].message });
    }

    const { email, name } = validation.data;
    const db = getDb();

    // Check if already subscribed
    const existing = await db.execute({
      sql: 'SELECT id, is_active FROM subscribers WHERE email = ?',
      args: [email]
    });

    if (existing.rows.length > 0) {
      if (existing.rows[0].is_active) {
        return res.status(409).json({ error: 'Email déjà inscrit à la newsletter' });
      }
      // Reactivate subscription
      await db.execute({
        sql: 'UPDATE subscribers SET is_active = 1, name = ? WHERE email = ?',
        args: [name || null, email]
      });
    } else {
      await db.execute({
        sql: 'INSERT INTO subscribers (email, name) VALUES (?, ?)',
        args: [email, name || null]
      });
    }

    res.status(201).json({ message: 'Inscription à la newsletter réussie !' });
  } catch (error) {
    console.error('Subscribe error:', error);
    res.status(500).json({ error: 'Erreur lors de l\'inscription à la newsletter' });
  }
});

module.exports = router;
