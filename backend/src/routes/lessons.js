const express = require('express');
const { getDb } = require('../db/connection');
const router = express.Router();

// GET /api/lessons/:id - Get lesson content
router.get('/:id', async (req, res) => {
  try {
    const db = getDb();
    const result = await db.execute({
      sql: `SELECT l.*, c.title as chapter_title, c.course_id, 
            co.title as course_title, co.slug as course_slug
            FROM lessons l 
            JOIN chapters c ON l.chapter_id = c.id 
            JOIN courses co ON c.course_id = co.id
            WHERE l.id = ?`,
      args: [req.params.id]
    });
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Leçon non trouvée' });
    }
    res.json({ lesson: result.rows[0] });
  } catch (error) {
    console.error('Lesson error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
