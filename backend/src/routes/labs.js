const express = require('express');
const { getDb } = require('../db/connection');
const { authenticate, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// GET /api/labs - List labs with filters
router.get('/', async (req, res) => {
  try {
    const { difficulty, category, page = 1, limit = 12 } = req.query;
    const db = getDb();

    let sql = 'SELECT id, title, slug, description, short_description, category, difficulty, duration_minutes, environment_type, xp_reward, completion_count FROM labs WHERE is_published = 1';
    const args = [];

    if (difficulty) {
      sql += ' AND difficulty = ?';
      args.push(difficulty);
    }
    if (category) {
      sql += ' AND category = ?';
      args.push(category);
    }

    sql += ' ORDER BY created_at DESC';

    const offset = (parseInt(page) - 1) * parseInt(limit);
    sql += ' LIMIT ? OFFSET ?';
    args.push(parseInt(limit), offset);

    const result = await db.execute({ sql, args });

    let countSql = 'SELECT COUNT(*) as total FROM labs WHERE is_published = 1';
    const countArgs = [];
    if (difficulty) { countSql += ' AND difficulty = ?'; countArgs.push(difficulty); }
    if (category) { countSql += ' AND category = ?'; countArgs.push(category); }

    const countResult = await db.execute({ sql: countSql, args: countArgs });
    const total = countResult.rows[0].total;

    res.json({
      labs: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('List labs error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des labs' });
  }
});

// GET /api/labs/:slug - Get lab by slug
router.get('/:slug', optionalAuth, async (req, res) => {
  try {
    const db = getDb();
    const { slug } = req.params;

    const labResult = await db.execute({
      sql: 'SELECT * FROM labs WHERE slug = ? AND is_published = 1',
      args: [slug]
    });

    if (labResult.rows.length === 0) {
      return res.status(404).json({ error: 'Lab non trouvé' });
    }

    const lab = labResult.rows[0];

    // Check user completion status if authenticated
    let userCompletion = null;
    if (req.user) {
      const completionResult = await db.execute({
        sql: 'SELECT * FROM lab_completions WHERE user_id = ? AND lab_id = ? ORDER BY started_at DESC LIMIT 1',
        args: [req.user.id, lab.id]
      });
      if (completionResult.rows.length > 0) {
        userCompletion = completionResult.rows[0];
      }
    }

    res.json({ lab: { ...lab, userCompletion } });
  } catch (error) {
    console.error('Get lab error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du lab' });
  }
});

// POST /api/labs/:id/start - Start a lab
router.post('/:id/start', authenticate, async (req, res) => {
  try {
    const db = getDb();
    const labId = parseInt(req.params.id);

    // Check lab exists
    const labResult = await db.execute({
      sql: 'SELECT id, title FROM labs WHERE id = ?',
      args: [labId]
    });

    if (labResult.rows.length === 0) {
      return res.status(404).json({ error: 'Lab non trouvé' });
    }

    // Check if already in progress
    const existingResult = await db.execute({
      sql: "SELECT id FROM lab_completions WHERE user_id = ? AND lab_id = ? AND status = 'in_progress'",
      args: [req.user.id, labId]
    });

    if (existingResult.rows.length > 0) {
      return res.status(409).json({ error: 'Lab déjà en cours' });
    }

    await db.execute({
      sql: 'INSERT INTO lab_completions (user_id, lab_id) VALUES (?, ?)',
      args: [req.user.id, labId]
    });

    res.status(201).json({ message: 'Lab démarré' });
  } catch (error) {
    console.error('Start lab error:', error);
    res.status(500).json({ error: 'Erreur lors du démarrage du lab' });
  }
});

// POST /api/labs/:id/complete - Complete a lab
router.post('/:id/complete', authenticate, async (req, res) => {
  try {
    const db = getDb();
    const labId = parseInt(req.params.id);
    const { time_spent } = req.body;

    // Check lab exists and get XP
    const labResult = await db.execute({
      sql: 'SELECT id, title, xp_reward FROM labs WHERE id = ?',
      args: [labId]
    });

    if (labResult.rows.length === 0) {
      return res.status(404).json({ error: 'Lab non trouvé' });
    }

    const lab = labResult.rows[0];

    // Update completion
    const completionResult = await db.execute({
      sql: "SELECT id, attempts FROM lab_completions WHERE user_id = ? AND lab_id = ? AND status = 'in_progress' ORDER BY started_at DESC LIMIT 1",
      args: [req.user.id, labId]
    });

    if (completionResult.rows.length === 0) {
      return res.status(400).json({ error: 'Aucun lab en cours trouvé' });
    }

    const completion = completionResult.rows[0];

    await db.execute({
      sql: "UPDATE lab_completions SET status = 'completed', completed_at = CURRENT_TIMESTAMP, time_spent = ? WHERE id = ?",
      args: [time_spent || 0, completion.id]
    });

    // Update lab completion count
    await db.execute({
      sql: 'UPDATE labs SET completion_count = completion_count + 1 WHERE id = ?',
      args: [labId]
    });

    // Award XP
    await db.execute({
      sql: 'UPDATE users SET xp_points = xp_points + ? WHERE id = ?',
      args: [lab.xp_reward, req.user.id]
    });

    res.json({
      message: 'Lab terminé avec succès !',
      xp_earned: lab.xp_reward
    });
  } catch (error) {
    console.error('Complete lab error:', error);
    res.status(500).json({ error: 'Erreur lors de la complétion du lab' });
  }
});

module.exports = router;
