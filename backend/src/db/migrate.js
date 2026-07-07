require('dotenv').config();
const { getDb } = require('./connection');

const migrations = [
  // Users table
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    avatar_url TEXT,
    role TEXT DEFAULT 'student' CHECK(role IN ('student', 'mentor', 'admin')),
    plan TEXT DEFAULT 'free' CHECK(plan IN ('free', 'starter', 'pro', 'enterprise')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`,

  // Courses table
  `CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    short_description TEXT,
    icon TEXT,
    level TEXT CHECK(level IN ('debutant', 'intermediaire', 'avance', 'expert')),
    duration_hours INTEGER,
    video_count INTEGER DEFAULT 0,
    lab_count INTEGER DEFAULT 0,
    project_count INTEGER DEFAULT 0,
    price REAL DEFAULT 0,
    original_price REAL DEFAULT 0,
    category TEXT,
    badge TEXT,
    rating REAL DEFAULT 0,
    enrollment_count INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`,

  // Course chapters
  `CREATE TABLE IF NOT EXISTS chapters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    order_index INTEGER NOT NULL,
    duration_minutes INTEGER DEFAULT 0,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
  )`,

  // Lessons within chapters
  `CREATE TABLE IF NOT EXISTS lessons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chapter_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    content_type TEXT CHECK(content_type IN ('video', 'text', 'quiz', 'lab')),
    duration_minutes INTEGER DEFAULT 0,
    order_index INTEGER NOT NULL,
    is_free BOOLEAN DEFAULT 0,
    FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE
  )`,

  // Enrollments
  `CREATE TABLE IF NOT EXISTS enrollments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    status TEXT DEFAULT 'active' CHECK(status IN ('active', 'completed', 'paused')),
    progress_percent REAL DEFAULT 0,
    enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE(user_id, course_id)
  )`,

  // Lesson progress
  `CREATE TABLE IF NOT EXISTS lesson_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    lesson_id INTEGER NOT NULL,
    completed BOOLEAN DEFAULT 0,
    completed_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
    UNIQUE(user_id, lesson_id)
  )`,

  // Labs
  `CREATE TABLE IF NOT EXISTS labs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT,
    difficulty TEXT CHECK(difficulty IN ('facile', 'moyen', 'difficile', 'expert')),
    duration_minutes INTEGER,
    technologies TEXT,
    completion_count INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`,

  // Lab completions
  `CREATE TABLE IF NOT EXISTS lab_completions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    lab_id INTEGER NOT NULL,
    started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME,
    score INTEGER DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (lab_id) REFERENCES labs(id) ON DELETE CASCADE
  )`,

  // Tools
  `CREATE TABLE IF NOT EXISTS tools (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT,
    category TEXT CHECK(category IN ('containers', 'cicd', 'iac', 'monitoring', 'cloud', 'security')),
    popularity INTEGER DEFAULT 0,
    website_url TEXT
  )`,

  // Certifications
  `CREATE TABLE IF NOT EXISTS certifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT,
    provider TEXT,
    prep_hours INTEGER,
    exercise_count INTEGER,
    success_rate REAL DEFAULT 0,
    is_published BOOLEAN DEFAULT 1
  )`,

  // Certification progress
  `CREATE TABLE IF NOT EXISTS cert_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    certification_id INTEGER NOT NULL,
    progress_percent REAL DEFAULT 0,
    started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (certification_id) REFERENCES certifications(id) ON DELETE CASCADE,
    UNIQUE(user_id, certification_id)
  )`,

  // Blog posts
  `CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    category TEXT,
    author_id INTEGER,
    image_icon TEXT,
    read_time_minutes INTEGER DEFAULT 5,
    is_featured BOOLEAN DEFAULT 0,
    is_published BOOLEAN DEFAULT 1,
    published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id)
  )`,

  // Newsletter subscribers
  `CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT 1
  )`,

  // Roadmap items
  `CREATE TABLE IF NOT EXISTS roadmap_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_index INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    level TEXT CHECK(level IN ('fondamentaux', 'intermediaire', 'avance', 'expert')),
    duration_weeks INTEGER,
    skills TEXT,
    progress_default INTEGER DEFAULT 0
  )`
];

async function migrate() {
  const db = getDb();
  
  console.log('🔄 Running migrations...');
  
  for (const sql of migrations) {
    try {
      await db.execute(sql);
    } catch (error) {
      console.error('❌ Migration failed:', error.message);
      console.error('SQL:', sql.substring(0, 100));
      process.exit(1);
    }
  }
  
  console.log('✅ All migrations completed successfully!');
}

migrate().catch(console.error);
