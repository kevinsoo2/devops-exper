const express = require('express');
const { getDb } = require('../db/connection');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// GET /api/progress - Get user's overall progress
router.get('/', authenticate, async (req, res) => {
  try {
    const db = getDb();
    const userId = req.user.id;

    // Get enrollments with course info
    const enrollments = await db.execute({
      sql: `SELECT e.*, c.title, c.slug, c.icon, c.duration_hours 
            FROM enrollments e 
            JOIN courses c ON e.course_id = c.id 
            WHERE e.user_id = ? 
            ORDER BY e.enrolled_at DESC`,
      args: [userId]
    });

    // Get lab completions
    const labCompletions = await db.execute({
      sql: `SELECT lc.*, l.title, l.slug, l.difficulty 
            FROM lab_completions lc 
            JOIN labs l ON lc.lab_id = l.id 
            WHERE lc.user_id = ? AND lc.completed_at IS NOT NULL 
            ORDER BY lc.completed_at DESC`,
      args: [userId]
    });

    // Get certification progress
    const certProgress = await db.execute({
      sql: `SELECT cp.*, c.title, c.slug, c.icon 
            FROM cert_progress cp 
            JOIN certifications c ON cp.certification_id = c.id 
            WHERE cp.user_id = ?`,
      args: [userId]
    });

    // Calculate stats
    const totalHoursLearned = enrollments.rows.reduce((acc, e) => {
      return acc + (e.progress_percent / 100 * e.duration_hours);
    }, 0);

    res.json({
      enrollments: enrollments.rows,
      lab_completions: labCompletions.rows,
      cert_progress: certProgress.rows,
      stats: {
        courses_enrolled: enrollments.rows.length,
        courses_completed: enrollments.rows.filter(e => e.status === 'completed').length,
        labs_completed: labCompletions.rows.length,
        hours_learned: Math.round(totalHoursLearned),
        certifications_in_progress: certProgress.rows.length
      }
    });
  } catch (error) {
    console.error('Progress error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de la progression' });
  }
});

// PUT /api/progress/lesson/:lessonId - Mark lesson as complete
router.put('/lesson/:lessonId', authenticate, async (req, res) => {
  try {
    const db = getDb();
    
    await db.execute({
      sql: `INSERT OR REPLACE INTO lesson_progress (user_id, lesson_id, completed, completed_at) 
            VALUES (?, ?, 1, CURRENT_TIMESTAMP)`,
      args: [req.user.id, req.params.lessonId]
    });

    res.json({ message: 'Leçon marquée comme complétée' });
  } catch (error) {
    console.error('Lesson progress error:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
});

module.exports = router;
