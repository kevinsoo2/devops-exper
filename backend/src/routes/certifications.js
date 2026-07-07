const express = require('express');
const { getDb } = require('../db/connection');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// GET /api/certifications - List all certifications
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const result = await db.execute('SELECT * FROM certifications WHERE is_published = 1 ORDER BY prep_hours');
    res.json({ certifications: result.rows });
  } catch (error) {
    console.error('Certifications list error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des certifications' });
  }
});

// GET /api/certifications/:slug
router.get('/:slug', async (req, res) => {
  try {
    const db = getDb();
    const result = await db.execute({
      sql: 'SELECT * FROM certifications WHERE slug = ? AND is_published = 1',
      args: [req.params.slug]
    });

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Certification non trouvée' });
    }

    res.json({ certification: result.rows[0] });
  } catch (error) {
    console.error('Certification detail error:', error);
    res.status(500).json({ error: 'Erreur' });
  }
});

// POST /api/certifications/:slug/start - Start certification prep
router.post('/:slug/start', authenticate, async (req, res) => {
  try {
    const db = getDb();
    const certResult = await db.execute({
      sql: 'SELECT id FROM certifications WHERE slug = ?',
      args: [req.params.slug]
    });

    if (certResult.rows.length === 0) {
      return res.status(404).json({ error: 'Certification non trouvée' });
    }

    await db.execute({
      sql: 'INSERT OR IGNORE INTO cert_progress (user_id, certification_id) VALUES (?, ?)',
      args: [req.user.id, certResult.rows[0].id]
    });

    res.status(201).json({ message: 'Préparation démarrée' });
  } catch (error) {
    console.error('Cert start error:', error);
    res.status(500).json({ error: 'Erreur' });
  }
});

module.exports = router;
