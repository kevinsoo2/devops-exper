const express = require('express');
const { getDb } = require('../db/connection');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// GET /api/notifications - Get user notifications with unread count
router.get('/', authenticate, async (req, res) => {
  try {
    const db = getDb();
    const userId = req.user.id;
    const { page = 1, limit = 20 } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const result = await db.execute({
      sql: 'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?',
      args: [userId, parseInt(limit), offset]
    });

    // Get unread count
    const unreadResult = await db.execute({
      sql: 'SELECT COUNT(*) as unread_count FROM notifications WHERE user_id = ? AND is_read = 0',
      args: [userId]
    });

    // Get total count
    const totalResult = await db.execute({
      sql: 'SELECT COUNT(*) as total FROM notifications WHERE user_id = ?',
      args: [userId]
    });

    res.json({
      notifications: result.rows,
      unread_count: unreadResult.rows[0].unread_count,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalResult.rows[0].total,
        pages: Math.ceil(totalResult.rows[0].total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des notifications' });
  }
});

// PUT /api/notifications/read-all - Mark all notifications as read
router.put('/read-all', authenticate, async (req, res) => {
  try {
    const db = getDb();
    const userId = req.user.id;

    await db.execute({
      sql: 'UPDATE notifications SET is_read = 1 WHERE user_id = ? AND is_read = 0',
      args: [userId]
    });

    res.json({ message: 'Toutes les notifications marquées comme lues' });
  } catch (error) {
    console.error('Mark all read error:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour des notifications' });
  }
});

module.exports = router;
