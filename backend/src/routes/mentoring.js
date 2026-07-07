const express = require('express');
const { getDb } = require('../db/connection');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// GET /api/mentoring/mentors - List available mentors
router.get('/mentors', async (req, res) => {
  try {
    const db = getDb();

    const result = await db.execute(
      `SELECT id, username, full_name, avatar_url, bio, xp_points, level, github_url, linkedin_url FROM users WHERE role = 'mentor' OR role = 'admin' ORDER BY xp_points DESC`
    );

    res.json({ mentors: result.rows });
  } catch (error) {
    console.error('List mentors error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des mentors' });
  }
});

// POST /api/mentoring/sessions - Book a mentoring session
router.post('/sessions', authenticate, async (req, res) => {
  try {
    const { mentor_id, topic, description, scheduled_at, duration_minutes } = req.body;
    const db = getDb();

    if (!mentor_id || !topic || !scheduled_at) {
      return res.status(400).json({ error: 'Mentor, sujet et date requis' });
    }

    // Check mentor exists and is a mentor/admin
    const mentorResult = await db.execute({
      sql: "SELECT id, full_name FROM users WHERE id = ? AND (role = 'mentor' OR role = 'admin')",
      args: [mentor_id]
    });

    if (mentorResult.rows.length === 0) {
      return res.status(404).json({ error: 'Mentor non trouvé' });
    }

    // Cannot book with yourself
    if (parseInt(mentor_id) === req.user.id) {
      return res.status(400).json({ error: 'Vous ne pouvez pas réserver une session avec vous-même' });
    }

    const result = await db.execute({
      sql: 'INSERT INTO mentoring_sessions (mentor_id, mentee_id, topic, description, scheduled_at, duration_minutes) VALUES (?, ?, ?, ?, ?, ?)',
      args: [mentor_id, req.user.id, topic, description || null, scheduled_at, duration_minutes || 60]
    });

    res.status(201).json({
      message: 'Session de mentorat réservée',
      session_id: Number(result.lastInsertRowid)
    });
  } catch (error) {
    console.error('Book session error:', error);
    res.status(500).json({ error: 'Erreur lors de la réservation de la session' });
  }
});

// GET /api/mentoring/sessions - Get my sessions
router.get('/sessions', authenticate, async (req, res) => {
  try {
    const db = getDb();
    const userId = req.user.id;

    const result = await db.execute({
      sql: `SELECT ms.*, 
            mentor.username as mentor_username, mentor.full_name as mentor_name, mentor.avatar_url as mentor_avatar,
            mentee.username as mentee_username, mentee.full_name as mentee_name, mentee.avatar_url as mentee_avatar
            FROM mentoring_sessions ms
            JOIN users mentor ON ms.mentor_id = mentor.id
            JOIN users mentee ON ms.mentee_id = mentee.id
            WHERE ms.mentor_id = ? OR ms.mentee_id = ?
            ORDER BY ms.scheduled_at DESC`,
      args: [userId, userId]
    });

    res.json({ sessions: result.rows });
  } catch (error) {
    console.error('Get sessions error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des sessions' });
  }
});

// POST /api/mentoring/sessions/:id/rate - Rate a session
router.post('/sessions/:id/rate', authenticate, async (req, res) => {
  try {
    const { rating, feedback } = req.body;
    const db = getDb();
    const sessionId = parseInt(req.params.id);

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Note entre 1 et 5 requise' });
    }

    // Check session exists and user is the mentee
    const sessionResult = await db.execute({
      sql: "SELECT id, mentee_id, status FROM mentoring_sessions WHERE id = ? AND mentee_id = ?",
      args: [sessionId, req.user.id]
    });

    if (sessionResult.rows.length === 0) {
      return res.status(404).json({ error: 'Session non trouvée ou non autorisée' });
    }

    await db.execute({
      sql: "UPDATE mentoring_sessions SET rating = ?, feedback = ?, status = 'completed' WHERE id = ?",
      args: [rating, feedback || null, sessionId]
    });

    res.json({ message: 'Session évaluée avec succès' });
  } catch (error) {
    console.error('Rate session error:', error);
    res.status(500).json({ error: 'Erreur lors de l\'évaluation de la session' });
  }
});

module.exports = router;
