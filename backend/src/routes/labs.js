const express = require('express');
const { getDb } = require('../db/connection');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// GET /api/labs - List all labs
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const { difficulty } = req.query;

    let sql = 'SELECT * FROM labs WHERE is_published = 1';
    const args = [];

    if (difficulty) {
      sql += ' AND difficulty = ?';
      args.push(difficulty);
    }

    sql += ' ORDER BY difficulty, duration_minutes';

    const result = await db.execute({ sql, args });
    res.json({ labs: result.rows });
  } catch (error) {
    console.error('Labs list error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des labs' });
  }
});

// GET /api/labs/:slug
router.get('/:slug', async (req, res) => {
  try {
    const db = getDb();
    const result = await db.execute({
      sql: 'SELECT * FROM labs WHERE slug = ? AND is_published = 1',
      args: [req.params.slug]
    });

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Lab non trouvé' });
    }

    res.json({ lab: result.rows[0] });
  } catch (error) {
    console.error('Lab detail error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du lab' });
  }
});

// POST /api/labs/:slug/start - Start a lab
router.post('/:slug/start', authenticate, async (req, res) => {
  try {
    const db = getDb();
    const labResult = await db.execute({
      sql: 'SELECT id FROM labs WHERE slug = ?',
      args: [req.params.slug]
    });

    if (labResult.rows.length === 0) {
      return res.status(404).json({ error: 'Lab non trouvé' });
    }

    await db.execute({
      sql: 'INSERT INTO lab_completions (user_id, lab_id) VALUES (?, ?)',
      args: [req.user.id, labResult.rows[0].id]
    });

    res.status(201).json({ message: 'Lab démarré', lab_id: labResult.rows[0].id });
  } catch (error) {
    console.error('Lab start error:', error);
    res.status(500).json({ error: 'Erreur lors du démarrage du lab' });
  }
});

// POST /api/labs/:slug/complete - Complete a lab
router.post('/:slug/complete', authenticate, async (req, res) => {
  try {
    const db = getDb();
    const labResult = await db.execute({
      sql: 'SELECT id FROM labs WHERE slug = ?',
      args: [req.params.slug]
    });

    if (labResult.rows.length === 0) {
      return res.status(404).json({ error: 'Lab non trouvé' });
    }

    const labId = labResult.rows[0].id;

    await db.execute({
      sql: `UPDATE lab_completions SET completed_at = CURRENT_TIMESTAMP, score = ? 
            WHERE user_id = ? AND lab_id = ? AND completed_at IS NULL`,
      args: [req.body.score || 100, req.user.id, labId]
    });

    await db.execute({
      sql: 'UPDATE labs SET completion_count = completion_count + 1 WHERE id = ?',
      args: [labId]
    });

    res.json({ message: 'Lab complété! Bravo!' });
  } catch (error) {
    console.error('Lab complete error:', error);
    res.status(500).json({ error: 'Erreur lors de la complétion du lab' });
  }
});

module.exports = router;
