const express = require('express');
const { getDb } = require('../db/connection');
const { authenticate, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// GET /api/certifications - List certifications
router.get('/', async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    const db = getDb();

    let sql = 'SELECT id, name, slug, description, provider, category, difficulty, mock_exam_count, cost_usd, validity_years, is_popular FROM certifications';
    const args = [];
    const conditions = [];

    if (category) {
      conditions.push('category = ?');
      args.push(category);
    }
    if (difficulty) {
      conditions.push('difficulty = ?');
      args.push(difficulty);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY is_popular DESC, name ASC';

    const result = await db.execute({ sql, args });

    res.json({ certifications: result.rows });
  } catch (error) {
    console.error('List certifications error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des certifications' });
  }
});

// GET /api/certifications/:slug - Get certification by slug
router.get('/:slug', optionalAuth, async (req, res) => {
  try {
    const db = getDb();
    const { slug } = req.params;

    const result = await db.execute({
      sql: 'SELECT * FROM certifications WHERE slug = ?',
      args: [slug]
    });

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Certification non trouvée' });
    }

    const certification = result.rows[0];

    // Check user progress if authenticated
    let userProgress = null;
    if (req.user) {
      const progressResult = await db.execute({
        sql: 'SELECT * FROM cert_progress WHERE user_id = ? AND certification_id = ?',
        args: [req.user.id, certification.id]
      });
      if (progressResult.rows.length > 0) {
        userProgress = progressResult.rows[0];
      }
    }

    res.json({ certification: { ...certification, userProgress } });
  } catch (error) {
    console.error('Get certification error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de la certification' });
  }
});

// POST /api/certifications/:id/start - Start certification prep
router.post('/:id/start', authenticate, async (req, res) => {
  try {
    const db = getDb();
    const certId = parseInt(req.params.id);
    const { target_date } = req.body;

    // Check certification exists
    const certResult = await db.execute({
      sql: 'SELECT id, name FROM certifications WHERE id = ?',
      args: [certId]
    });

    if (certResult.rows.length === 0) {
      return res.status(404).json({ error: 'Certification non trouvée' });
    }

    // Check if already started
    const existingResult = await db.execute({
      sql: 'SELECT id FROM cert_progress WHERE user_id = ? AND certification_id = ?',
      args: [req.user.id, certId]
    });

    if (existingResult.rows.length > 0) {
      return res.status(409).json({ error: 'Préparation déjà commencée' });
    }

    await db.execute({
      sql: 'INSERT INTO cert_progress (user_id, certification_id, target_date) VALUES (?, ?, ?)',
      args: [req.user.id, certId, target_date || null]
    });

    res.status(201).json({ message: 'Préparation à la certification démarrée' });
  } catch (error) {
    console.error('Start cert prep error:', error);
    res.status(500).json({ error: 'Erreur lors du démarrage de la préparation' });
  }
});

module.exports = router;
