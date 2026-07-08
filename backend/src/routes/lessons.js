const express = require('express');
const { getDb } = require('../db/connection');
const router = express.Router();

// GET /api/lessons/:id - Get lesson content with navigation (prev/next)
router.get('/:id', async (req, res) => {
  try {
    const db = getDb();
    const result = await db.execute({
      sql: `SELECT l.*, c.title as chapter_title, c.course_id, c.order_index as chapter_order,
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
    
    const lesson = result.rows[0];
    
    // Get all lessons for this course in order (to find prev/next)
    const allLessons = await db.execute({
      sql: `SELECT l.id, l.title, l.content_type, l.duration_minutes, c.order_index as ch_order, l.order_index
            FROM lessons l 
            JOIN chapters c ON l.chapter_id = c.id 
            WHERE c.course_id = ?
            ORDER BY c.order_index, l.order_index`,
      args: [lesson.course_id]
    });
    
    // Find current index and get prev/next
    const currentIdx = allLessons.rows.findIndex(l => l.id === lesson.id);
    const prevLesson = currentIdx > 0 ? allLessons.rows[currentIdx - 1] : null;
    const nextLesson = currentIdx < allLessons.rows.length - 1 ? allLessons.rows[currentIdx + 1] : null;
    const totalLessons = allLessons.rows.length;
    const currentPosition = currentIdx + 1;
    
    res.json({ 
      lesson,
      navigation: {
        prev: prevLesson ? { id: prevLesson.id, title: prevLesson.title } : null,
        next: nextLesson ? { id: nextLesson.id, title: nextLesson.title } : null,
        current: currentPosition,
        total: totalLessons,
        isLast: currentIdx === allLessons.rows.length - 1,
        isFirst: currentIdx === 0,
      }
    });
  } catch (error) {
    console.error('Lesson error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
