const express = require('express');
const { getDb } = require('../db/connection');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// GET /api/courses - List all courses
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const { category, level, search } = req.query;
    
    let sql = 'SELECT * FROM courses WHERE is_published = 1';
    const args = [];

    if (category) {
      sql += ' AND category = ?';
      args.push(category);
    }
    if (level) {
      sql += ' AND level = ?';
      args.push(level);
    }
    if (search) {
      sql += ' AND (title LIKE ? OR description LIKE ?)';
      args.push(`%${search}%`, `%${search}%`);
    }

    sql += ' ORDER BY enrollment_count DESC';

    const result = await db.execute({ sql, args });
    res.json({ courses: result.rows });
  } catch (error) {
    console.error('Courses list error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des cours' });
  }
});

// GET /api/courses/:slug - Get single course
router.get('/:slug', async (req, res) => {
  try {
    const db = getDb();
    const result = await db.execute({
      sql: 'SELECT * FROM courses WHERE slug = ? AND is_published = 1',
      args: [req.params.slug]
    });

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cours non trouvé' });
    }

    const course = result.rows[0];

    // Get chapters with lessons
    const chapters = await db.execute({
      sql: 'SELECT * FROM chapters WHERE course_id = ? ORDER BY order_index',
      args: [course.id]
    });

    const chaptersWithLessons = await Promise.all(
      chapters.rows.map(async (chapter) => {
        const lessons = await db.execute({
          sql: 'SELECT id, title, content_type, duration_minutes, order_index, is_free FROM lessons WHERE chapter_id = ? ORDER BY order_index',
          args: [chapter.id]
        });
        return { ...chapter, lessons: lessons.rows };
      })
    );

    res.json({ course, chapters: chaptersWithLessons });
  } catch (error) {
    console.error('Course detail error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du cours' });
  }
});

// POST /api/courses/:slug/enroll - Enroll in a course
router.post('/:slug/enroll', authenticate, async (req, res) => {
  try {
    const db = getDb();
    const courseResult = await db.execute({
      sql: 'SELECT id FROM courses WHERE slug = ?',
      args: [req.params.slug]
    });

    if (courseResult.rows.length === 0) {
      return res.status(404).json({ error: 'Cours non trouvé' });
    }

    const courseId = courseResult.rows[0].id;

    await db.execute({
      sql: 'INSERT OR IGNORE INTO enrollments (user_id, course_id) VALUES (?, ?)',
      args: [req.user.id, courseId]
    });

    // Increment enrollment count
    await db.execute({
      sql: 'UPDATE courses SET enrollment_count = enrollment_count + 1 WHERE id = ?',
      args: [courseId]
    });

    res.status(201).json({ message: 'Inscription réussie' });
  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({ error: 'Erreur lors de l\'inscription' });
  }
});

module.exports = router;
