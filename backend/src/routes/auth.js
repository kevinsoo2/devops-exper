const express = require('express');
const bcrypt = require('bcryptjs');
const { z } = require('zod');
const { getDb } = require('../db/connection');
const { generateToken, authenticate } = require('../middleware/auth');

const router = express.Router();

// Validation schemas
const registerSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Minimum 6 caractères'),
  name: z.string().min(2, 'Minimum 2 caractères')
});

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis')
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);
    const db = getDb();

    // Check if user exists
    const existing = await db.execute({
      sql: 'SELECT id FROM users WHERE email = ?',
      args: [data.email]
    });

    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Email déjà utilisé' });
    }

    // Hash password and create user
    const passwordHash = await bcrypt.hash(data.password, 12);
    const result = await db.execute({
      sql: 'INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)',
      args: [data.email, passwordHash, data.name]
    });

    const user = { id: Number(result.lastInsertRowid), email: data.email, name: data.name, role: 'student' };
    const token = generateToken(user);

    res.status(201).json({
      message: 'Compte créé avec succès',
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role, plan: 'free' }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error('Register error:', error);
    res.status(500).json({ error: 'Erreur lors de l\'inscription' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);
    const db = getDb();

    const result = await db.execute({
      sql: 'SELECT * FROM users WHERE email = ?',
      args: [data.email]
    });

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(data.password, user.password_hash);

    if (!validPassword) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role, plan: user.plan, avatar_url: user.avatar_url }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error('Login error:', error);
    res.status(500).json({ error: 'Erreur lors de la connexion' });
  }
});

// GET /api/auth/me
router.get('/me', authenticate, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
