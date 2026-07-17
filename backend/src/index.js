require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc)
    if (!origin) return callback(null, true);
    // Allow all vercel.app and onrender.com domains, plus localhost
    const allowed = [
      /\.vercel\.app$/,
      /\.onrender\.com$/,
      /localhost/,
    ];
    if (allowed.some(pattern => pattern.test(origin))) {
      return callback(null, true);
    }
    callback(null, true); // Allow all for now
  },
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Trop de requêtes, veuillez réessayer plus tard.' }
});
app.use('/api/', limiter);

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    version: '2.0.0',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/labs', require('./routes/labs'));
app.use('/api/tools', require('./routes/tools'));
app.use('/api/certifications', require('./routes/certifications'));
app.use('/api/blog', require('./routes/blog'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/quizzes', require('./routes/quizzes'));
app.use('/api/community', require('./routes/community'));
app.use('/api/achievements', require('./routes/achievements'));
app.use('/api/mentoring', require('./routes/mentoring'));
app.use('/api/leaderboard', require('./routes/leaderboard'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/lessons', require('./routes/lessons'));
app.use('/api/cheatsheets', require('./routes/cheatsheets'));

// Seed endpoint (for adding new content without redeploying)
app.post('/api/admin/seed-databases', async (req, res) => {
  try {
    const { seedDatabaseCourses } = require('./db/seed-database-courses');
    const { seedDatabaseCourses2 } = require('./db/seed-database-courses-2');
    const { getDb } = require('./db/connection');
    const db = getDb();
    await seedDatabaseCourses(db);
    await seedDatabaseCourses2(db);
    res.json({ success: true, message: 'Cours de bases de données ajoutés avec succès' });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ error: 'Erreur lors du seeding', details: error.message });
  }
});

// Seed2 endpoint (just the new courses)
app.post('/api/admin/seed-databases-2', async (req, res) => {
  try {
    const { seedDatabaseCourses2 } = require('./db/seed-database-courses-2');
    const { getDb } = require('./db/connection');
    const db = getDb();
    await seedDatabaseCourses2(db);
    res.json({ success: true, message: 'Cours supplémentaires ajoutés' });
  } catch (error) {
    console.error('Seed2 error:', error);
    res.status(500).json({ error: error.message, stack: error.stack });
  }
});

// Seed labs endpoint
app.post('/api/admin/seed-labs', async (req, res) => {
  try {
    const { seedMoreLabs } = require('./db/seed-more-labs');
    const { getDb } = require('./db/connection');
    const db = getDb();
    await seedMoreLabs(db);
    res.json({ success: true, message: 'Labs supplémentaires ajoutés' });
  } catch (error) {
    console.error('Seed labs error:', error);
    res.status(500).json({ error: error.message, stack: error.stack });
  }
});

// Seed RHCSA cheatsheet
app.post('/api/admin/seed-rhcsa', async (req, res) => {
  try {
    const { seedRhcsaCheatsheet } = require('./db/seed-rhcsa-cheatsheet');
    const { getDb } = require('./db/connection');
    const db = getDb();
    await seedRhcsaCheatsheet(db);
    res.json({ success: true, message: 'Fiche RHCSA EX200 ajoutée' });
  } catch (error) {
    console.error('Seed RHCSA error:', error);
    res.status(500).json({ error: error.message, stack: error.stack });
  }
});

// Seed new courses
app.post('/api/admin/seed-new-courses', async (req, res) => {
  try {
    const { seedNewCourses } = require('./db/seed-new-courses');
    const { seedNewCourses2 } = require('./db/seed-new-courses-2');
    const { seedNewCourses3 } = require('./db/seed-new-courses-3');
    const { getDb } = require('./db/connection');
    const db = getDb();
    await seedNewCourses(db);
    await seedNewCourses2(db);
    await seedNewCourses3(db);
    res.json({ success: true, message: 'Tous les nouveaux cours ajoutés' });
  } catch (error) {
    console.error('Seed new courses error:', error);
    res.status(500).json({ error: error.message, stack: error.stack });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Erreur interne du serveur',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`🚀 DevOps Expert API V2 démarrée sur le port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
// Force deploy Wed Jul 15 10:47:40 PM UTC 2026
// redeploy 1784214273
// deploy 1784283004
