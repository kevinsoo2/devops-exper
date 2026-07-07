const express = require('express');
const { getDb } = require('../db/connection');
const { authenticate, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// GET /api/courses - List courses with filters
router.get('/', async (req, res) => {
  try {
    const { category, level, search, featured, page = 1, limit = 12 } = req.query;
    const db = getDb();

    let sql = 'SELECT id, title, slug, description, short_description, category, level, duration_hours, image_url, instructor, is_featured, enrollment_count, rating FROM courses WHERE is_published = 1';
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
    if (featured === 'true') {
      sql += ' AND is_featured = 1';
    }

    sql += ' ORDER BY is_featured DESC, created_at DESC';

    const offset = (parseInt(page) - 1) * parseInt(limit);
    sql += ' LIMIT ? OFFSET ?';
    args.push(parseInt(limit), offset);

    const result = await db.execute({ sql, args });

    // Get total count
    let countSql = 'SELECT COUNT(*) as total FROM courses WHERE is_published = 1';
    const countArgs = [];
    if (category) { countSql += ' AND category = ?'; countArgs.push(category); }
    if (level) { countSql += ' AND level = ?'; countArgs.push(level); }
    if (search) { countSql += ' AND (title LIKE ? OR description LIKE ?)'; countArgs.push(`%${search}%`, `%${search}%`); }
    if (featured === 'true') { countSql += ' AND is_featured = 1'; }

    const countResult = await db.execute({ sql: countSql, args: countArgs });
    const total = countResult.rows[0].total;

    res.json({
      courses: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('List courses error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des cours' });
  }
});

// GET /api/courses/:slug - Get course by slug
router.get('/:slug', optionalAuth, async (req, res) => {
  try {
    const db = getDb();
    const { slug } = req.params;

    const courseResult = await db.execute({
      sql: 'SELECT * FROM courses WHERE slug = ? AND is_published = 1',
      args: [slug]
    });

    if (courseResult.rows.length === 0) {
      return res.status(404).json({ error: 'Cours non trouvé' });
    }

    const course = courseResult.rows[0];

    // Get chapters with lessons
    const chaptersResult = await db.execute({
      sql: 'SELECT * FROM chapters WHERE course_id = ? ORDER BY order_index',
      args: [course.id]
    });

    const chapters = [];
    for (const chapter of chaptersResult.rows) {
      const lessonsResult = await db.execute({
        sql: 'SELECT id, title, content_type, duration_minutes, order_index, xp_reward FROM lessons WHERE chapter_id = ? ORDER BY order_index',
        args: [chapter.id]
      });
      chapters.push({ ...chapter, lessons: lessonsResult.rows });
    }

    // Get reviews
    const reviewsResult = await db.execute({
      sql: `SELECT r.*, u.username, u.full_name, u.avatar_url FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.course_id = ? ORDER BY r.created_at DESC LIMIT 10`,
      args: [course.id]
    });

    // Check enrollment if authenticated
    let enrollment = null;
    if (req.user) {
      const enrollResult = await db.execute({
        sql: 'SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?',
        args: [req.user.id, course.id]
      });
      if (enrollResult.rows.length > 0) {
        enrollment = enrollResult.rows[0];
      }
    }

    res.json({
      course: {
        ...course,
        chapters,
        reviews: reviewsResult.rows,
        enrollment
      }
    });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du cours' });
  }
});

// POST /api/courses/:id/enroll - Enroll in a course
router.post('/:id/enroll', authenticate, async (req, res) => {
  try {
    const db = getDb();
    const courseId = parseInt(req.params.id);

    // Check course exists
    const courseResult = await db.execute({
      sql: 'SELECT id, title FROM courses WHERE id = ?',
      args: [courseId]
    });

    if (courseResult.rows.length === 0) {
      return res.status(404).json({ error: 'Cours non trouvé' });
    }

    // Check if already enrolled
    const existingEnroll = await db.execute({
      sql: 'SELECT id FROM enrollments WHERE user_id = ? AND course_id = ?',
      args: [req.user.id, courseId]
    });

    if (existingEnroll.rows.length > 0) {
      return res.status(409).json({ error: 'Vous êtes déjà inscrit à ce cours' });
    }

    // Enroll
    await db.execute({
      sql: 'INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)',
      args: [req.user.id, courseId]
    });

    // Update enrollment count
    await db.execute({
      sql: 'UPDATE courses SET enrollment_count = enrollment_count + 1 WHERE id = ?',
      args: [courseId]
    });

    // Award XP (+20)
    await db.execute({
      sql: 'UPDATE users SET xp_points = xp_points + 20 WHERE id = ?',
      args: [req.user.id]
    });

    res.status(201).json({
      message: 'Inscription au cours réussie',
      xp_earned: 20
    });
  } catch (error) {
    console.error('Enroll error:', error);
    res.status(500).json({ error: 'Erreur lors de l\'inscription au cours' });
  }
});

// POST /api/courses/:id/review - Add a review
router.post('/:id/review', authenticate, async (req, res) => {
  try {
    const db = getDb();
    const courseId = parseInt(req.params.id);
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Note entre 1 et 5 requise' });
    }

    // Check enrollment
    const enrollResult = await db.execute({
      sql: 'SELECT id FROM enrollments WHERE user_id = ? AND course_id = ?',
      args: [req.user.id, courseId]
    });

    if (enrollResult.rows.length === 0) {
      return res.status(403).json({ error: 'Vous devez être inscrit au cours pour le noter' });
    }

    // Add or update review
    await db.execute({
      sql: 'INSERT OR REPLACE INTO reviews (user_id, course_id, rating, comment) VALUES (?, ?, ?, ?)',
      args: [req.user.id, courseId, rating, comment || null]
    });

    // Update course rating
    const avgResult = await db.execute({
      sql: 'SELECT AVG(rating) as avg_rating FROM reviews WHERE course_id = ?',
      args: [courseId]
    });

    await db.execute({
      sql: 'UPDATE courses SET rating = ? WHERE id = ?',
      args: [avgResult.rows[0].avg_rating, courseId]
    });

    res.json({ message: 'Avis ajouté avec succès' });
  } catch (error) {
    console.error('Review error:', error);
    res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'avis' });
  }
});

module.exports = router;
