const express = require('express');
const { getDb } = require('../db/connection');
const { authenticate, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// GET /api/community/threads - List threads with filters
router.get('/threads', async (req, res) => {
  try {
    const { category, sort = 'recent', page = 1, limit = 20 } = req.query;
    const db = getDb();

    let sql = `SELECT t.*, u.username, u.full_name, u.avatar_url FROM forum_threads t JOIN users u ON t.user_id = u.id`;
    const args = [];

    if (category) {
      sql += ' WHERE t.category = ?';
      args.push(category);
    }

    switch (sort) {
      case 'popular':
        sql += ' ORDER BY t.view_count DESC';
        break;
      case 'replies':
        sql += ' ORDER BY t.reply_count DESC';
        break;
      case 'unsolved':
        sql += (category ? ' AND' : ' WHERE') + ' t.is_solved = 0 ORDER BY t.created_at DESC';
        break;
      default:
        sql += ' ORDER BY t.is_pinned DESC, t.created_at DESC';
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);
    sql += ' LIMIT ? OFFSET ?';
    args.push(parseInt(limit), offset);

    const result = await db.execute({ sql, args });

    let countSql = 'SELECT COUNT(*) as total FROM forum_threads';
    const countArgs = [];
    if (category) { countSql += ' WHERE category = ?'; countArgs.push(category); }

    const countResult = await db.execute({ sql: countSql, args: countArgs });
    const total = countResult.rows[0].total;

    res.json({
      threads: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('List threads error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des threads' });
  }
});

// GET /api/community/threads/:id - Get thread with replies (increment views)
router.get('/threads/:id', async (req, res) => {
  try {
    const db = getDb();
    const threadId = parseInt(req.params.id);

    // Increment view count
    await db.execute({
      sql: 'UPDATE forum_threads SET view_count = view_count + 1 WHERE id = ?',
      args: [threadId]
    });

    const threadResult = await db.execute({
      sql: `SELECT t.*, u.username, u.full_name, u.avatar_url, u.role FROM forum_threads t JOIN users u ON t.user_id = u.id WHERE t.id = ?`,
      args: [threadId]
    });

    if (threadResult.rows.length === 0) {
      return res.status(404).json({ error: 'Thread non trouvé' });
    }

    const thread = threadResult.rows[0];

    // Get replies
    const repliesResult = await db.execute({
      sql: `SELECT r.*, u.username, u.full_name, u.avatar_url, u.role FROM forum_replies r JOIN users u ON r.user_id = u.id WHERE r.thread_id = ? ORDER BY r.is_solution DESC, r.created_at ASC`,
      args: [threadId]
    });

    res.json({
      thread: {
        ...thread,
        replies: repliesResult.rows
      }
    });
  } catch (error) {
    console.error('Get thread error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du thread' });
  }
});

// POST /api/community/threads - Create a new thread (+5 XP)
router.post('/threads', authenticate, async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const db = getDb();

    if (!title || !content || !category) {
      return res.status(400).json({ error: 'Titre, contenu et catégorie requis' });
    }

    const result = await db.execute({
      sql: 'INSERT INTO forum_threads (user_id, title, content, category) VALUES (?, ?, ?, ?)',
      args: [req.user.id, title, content, category]
    });

    // Award XP (+5)
    await db.execute({
      sql: 'UPDATE users SET xp_points = xp_points + 5 WHERE id = ?',
      args: [req.user.id]
    });

    res.status(201).json({
      message: 'Thread créé avec succès',
      thread_id: Number(result.lastInsertRowid),
      xp_earned: 5
    });
  } catch (error) {
    console.error('Create thread error:', error);
    res.status(500).json({ error: 'Erreur lors de la création du thread' });
  }
});

// POST /api/community/threads/:id/reply - Reply to a thread (+3 XP)
router.post('/threads/:id/reply', authenticate, async (req, res) => {
  try {
    const { content, parent_reply_id } = req.body;
    const db = getDb();
    const threadId = parseInt(req.params.id);

    if (!content) {
      return res.status(400).json({ error: 'Contenu requis' });
    }

    // Check thread exists
    const threadResult = await db.execute({
      sql: 'SELECT id FROM forum_threads WHERE id = ?',
      args: [threadId]
    });

    if (threadResult.rows.length === 0) {
      return res.status(404).json({ error: 'Thread non trouvé' });
    }

    const result = await db.execute({
      sql: 'INSERT INTO forum_replies (thread_id, user_id, content, parent_reply_id) VALUES (?, ?, ?, ?)',
      args: [threadId, req.user.id, content, parent_reply_id || null]
    });

    // Update reply count
    await db.execute({
      sql: 'UPDATE forum_threads SET reply_count = reply_count + 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      args: [threadId]
    });

    // Award XP (+3)
    await db.execute({
      sql: 'UPDATE users SET xp_points = xp_points + 3 WHERE id = ?',
      args: [req.user.id]
    });

    res.status(201).json({
      message: 'Réponse ajoutée',
      reply_id: Number(result.lastInsertRowid),
      xp_earned: 3
    });
  } catch (error) {
    console.error('Reply error:', error);
    res.status(500).json({ error: 'Erreur lors de l\'ajout de la réponse' });
  }
});

module.exports = router;
