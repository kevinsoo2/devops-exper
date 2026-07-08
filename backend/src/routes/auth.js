const express = require('express');
const bcrypt = require('bcryptjs');
const { z } = require('zod');
const { getDb } = require('../db/connection');
const { generateToken, authenticate } = require('../middleware/auth');

const router = express.Router();

const registerSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  full_name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').optional(),
  username: z.string().min(2, 'Le nom d\'utilisateur doit contenir au moins 2 caractères').optional()
}).refine(data => data.full_name || data.username, {
  message: 'Un nom ou nom d\'utilisateur est requis'
});

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis')
});

const updateProfileSchema = z.object({
  full_name: z.string().min(2).optional(),
  bio: z.string().optional(),
  avatar_url: z.string().url().optional().nullable(),
  github_url: z.string().url().optional().nullable(),
  linkedin_url: z.string().url().optional().nullable(),
  website_url: z.string().url().optional().nullable()
});

// Generate username from full name
function generateUsername(fullName) {
  const base = fullName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
  const suffix = Math.floor(Math.random() * 9999);
  return `${base}_${suffix}`;
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const validation = registerSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors[0].message });
    }

    const { email, password, full_name, username } = validation.data;
    const displayName = full_name || username;
    const userUsername = username || email.split('@')[0];
    const db = getDb();

    // Check if email exists
    const existing = await db.execute({
      sql: 'SELECT id FROM users WHERE email = ?',
      args: [email]
    });

    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Cet email est déjà utilisé' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.execute({
      sql: `INSERT INTO users (email, password, username, full_name) VALUES (?, ?, ?, ?)`,
      args: [email, hashedPassword, userUsername, displayName]
    });

    const user = {
      id: Number(result.lastInsertRowid),
      email,
      username: userUsername,
      full_name: displayName,
      role: 'user'
    };

    const token = generateToken(user);

    res.status(201).json({
      message: 'Inscription réussie',
      user: { id: user.id, email, username, full_name, role: 'user', xp_points: 0, level: 1 },
      token
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Erreur lors de l\'inscription' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors[0].message });
    }

    const { email, password } = validation.data;
    const db = getDb();

    const result = await db.execute({
      sql: 'SELECT * FROM users WHERE email = ?',
      args: [email]
    });

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // Update last_active
    await db.execute({
      sql: 'UPDATE users SET last_active = CURRENT_TIMESTAMP WHERE id = ?',
      args: [user.id]
    });

    const token = generateToken(user);

    res.json({
      message: 'Connexion réussie',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        full_name: user.full_name,
        role: user.role,
        xp_points: user.xp_points,
        level: user.level,
        avatar_url: user.avatar_url
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Erreur lors de la connexion' });
  }
});

// GET /api/auth/me
router.get('/me', authenticate, async (req, res) => {
  try {
    const db = getDb();
    const result = await db.execute({
      sql: `SELECT id, email, username, full_name, avatar_url, bio, role, xp_points, level, streak_days, github_url, linkedin_url, website_url, last_active, created_at FROM users WHERE id = ?`,
      args: [req.user.id]
    });

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.json({ user: result.rows[0] });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du profil' });
  }
});

// PUT /api/auth/profile
router.put('/profile', authenticate, async (req, res) => {
  try {
    const validation = updateProfileSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors[0].message });
    }

    const updates = validation.data;
    const db = getDb();

    const fields = [];
    const values = [];
    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: 'Aucune modification fournie' });
    }

    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(req.user.id);

    await db.execute({
      sql: `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
      args: values
    });

    const result = await db.execute({
      sql: `SELECT id, email, username, full_name, avatar_url, bio, role, xp_points, level, streak_days, github_url, linkedin_url, website_url FROM users WHERE id = ?`,
      args: [req.user.id]
    });

    res.json({ message: 'Profil mis à jour', user: result.rows[0] });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du profil' });
  }
});

module.exports = router;
