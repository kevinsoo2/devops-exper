const { getDb } = require('./connection');
require('dotenv').config();

async function migrate() {
  const db = getDb();

  console.log('🚀 Démarrage de la migration...');

  const tables = [
    // 1. Users
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      username TEXT UNIQUE NOT NULL,
      full_name TEXT NOT NULL,
      avatar_url TEXT,
      bio TEXT,
      role TEXT DEFAULT 'user' CHECK(role IN ('user', 'admin', 'mentor')),
      xp_points INTEGER DEFAULT 0,
      level INTEGER DEFAULT 1,
      streak_days INTEGER DEFAULT 0,
      github_url TEXT,
      linkedin_url TEXT,
      website_url TEXT,
      last_active DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,

    // 2. Courses
    `CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT NOT NULL,
      short_description TEXT,
      category TEXT NOT NULL,
      level TEXT NOT NULL CHECK(level IN ('debutant', 'intermediaire', 'avance')),
      duration_hours INTEGER,
      image_url TEXT,
      instructor TEXT,
      prerequisites TEXT,
      learning_outcomes TEXT,
      is_featured INTEGER DEFAULT 0,
      is_published INTEGER DEFAULT 1,
      enrollment_count INTEGER DEFAULT 0,
      rating REAL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,

    // 3. Chapters
    `CREATE TABLE IF NOT EXISTS chapters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      course_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      order_index INTEGER NOT NULL,
      duration_minutes INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
    )`,

    // 4. Lessons
    `CREATE TABLE IF NOT EXISTS lessons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chapter_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      content TEXT,
      content_type TEXT DEFAULT 'text' CHECK(content_type IN ('text', 'video', 'quiz', 'exercise', 'interactive')),
      duration_minutes INTEGER,
      order_index INTEGER NOT NULL,
      is_free INTEGER DEFAULT 0,
      xp_reward INTEGER DEFAULT 10,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE
    )`,

    // 5. Enrollments
    `CREATE TABLE IF NOT EXISTS enrollments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      course_id INTEGER NOT NULL,
      progress_percent REAL DEFAULT 0,
      status TEXT DEFAULT 'active' CHECK(status IN ('active', 'completed', 'paused')),
      enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      completed_at DATETIME,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
      UNIQUE(user_id, course_id)
    )`,

    // 6. Lesson Progress
    `CREATE TABLE IF NOT EXISTS lesson_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      lesson_id INTEGER NOT NULL,
      completed INTEGER DEFAULT 0,
      completed_at DATETIME,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
      UNIQUE(user_id, lesson_id)
    )`,

    // 7. Labs
    `CREATE TABLE IF NOT EXISTS labs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT NOT NULL,
      short_description TEXT,
      category TEXT NOT NULL,
      difficulty TEXT NOT NULL CHECK(difficulty IN ('facile', 'moyen', 'difficile')),
      duration_minutes INTEGER,
      environment_type TEXT NOT NULL CHECK(environment_type IN ('docker', 'kubernetes', 'terraform', 'ansible', 'mixed')),
      instructions TEXT,
      xp_reward INTEGER DEFAULT 25,
      completion_count INTEGER DEFAULT 0,
      is_published INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,

    // 8. Lab Completions
    `CREATE TABLE IF NOT EXISTS lab_completions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      lab_id INTEGER NOT NULL,
      status TEXT DEFAULT 'in_progress' CHECK(status IN ('in_progress', 'completed', 'failed')),
      time_spent INTEGER DEFAULT 0,
      attempts INTEGER DEFAULT 1,
      started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      completed_at DATETIME,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (lab_id) REFERENCES labs(id) ON DELETE CASCADE
    )`,

    // 9. Tools
    `CREATE TABLE IF NOT EXISTS tools (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT NOT NULL,
      short_description TEXT,
      category TEXT NOT NULL,
      icon_url TEXT,
      docs_url TEXT,
      github_url TEXT,
      alternatives TEXT,
      use_cases TEXT,
      is_popular INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,

    // 10. Certifications
    `CREATE TABLE IF NOT EXISTS certifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT NOT NULL,
      provider TEXT NOT NULL,
      category TEXT NOT NULL,
      difficulty TEXT NOT NULL CHECK(difficulty IN ('debutant', 'intermediaire', 'avance', 'expert')),
      mock_exam_count INTEGER DEFAULT 0,
      cost_usd REAL,
      validity_years INTEGER,
      prerequisites TEXT,
      topics TEXT,
      resources TEXT,
      is_popular INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,

    // 11. Cert Progress
    `CREATE TABLE IF NOT EXISTS cert_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      certification_id INTEGER NOT NULL,
      status TEXT DEFAULT 'studying' CHECK(status IN ('studying', 'scheduled', 'passed', 'failed')),
      mock_exam_best_score REAL,
      target_date TEXT,
      notes TEXT,
      started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      completed_at DATETIME,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (certification_id) REFERENCES certifications(id) ON DELETE CASCADE,
      UNIQUE(user_id, certification_id)
    )`,

    // 12. Quizzes
    `CREATE TABLE IF NOT EXISTS quizzes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      category TEXT NOT NULL,
      difficulty TEXT NOT NULL CHECK(difficulty IN ('facile', 'moyen', 'difficile')),
      pass_score INTEGER DEFAULT 70,
      time_limit_minutes INTEGER,
      xp_reward INTEGER DEFAULT 15,
      question_count INTEGER DEFAULT 0,
      attempt_count INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,

    // 13. Quiz Questions
    `CREATE TABLE IF NOT EXISTS quiz_questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      quiz_id INTEGER NOT NULL,
      question TEXT NOT NULL,
      question_type TEXT DEFAULT 'multiple_choice' CHECK(question_type IN ('multiple_choice', 'true_false', 'multi_select')),
      options TEXT NOT NULL,
      correct_answer TEXT NOT NULL,
      explanation TEXT,
      order_index INTEGER NOT NULL,
      FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
    )`,

    // 14. Quiz Attempts
    `CREATE TABLE IF NOT EXISTS quiz_attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      quiz_id INTEGER NOT NULL,
      score REAL NOT NULL,
      passed INTEGER DEFAULT 0,
      answers TEXT,
      time_taken INTEGER,
      attempted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
    )`,

    // 15. Posts (Blog)
    `CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      content TEXT NOT NULL,
      excerpt TEXT,
      category TEXT NOT NULL,
      tags TEXT,
      cover_image TEXT,
      author_id INTEGER,
      is_featured INTEGER DEFAULT 0,
      is_published INTEGER DEFAULT 1,
      view_count INTEGER DEFAULT 0,
      like_count INTEGER DEFAULT 0,
      published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (author_id) REFERENCES users(id)
    )`,

    // 16. Forum Threads
    `CREATE TABLE IF NOT EXISTS forum_threads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      category TEXT NOT NULL,
      view_count INTEGER DEFAULT 0,
      reply_count INTEGER DEFAULT 0,
      is_pinned INTEGER DEFAULT 0,
      is_solved INTEGER DEFAULT 0,
      solved_reply_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`,

    // 17. Forum Replies
    `CREATE TABLE IF NOT EXISTS forum_replies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      thread_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      is_solution INTEGER DEFAULT 0,
      parent_reply_id INTEGER,
      like_count INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (thread_id) REFERENCES forum_threads(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (parent_reply_id) REFERENCES forum_replies(id)
    )`,

    // 18. Achievements
    `CREATE TABLE IF NOT EXISTS achievements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      icon TEXT,
      category TEXT NOT NULL,
      rarity TEXT DEFAULT 'common' CHECK(rarity IN ('common', 'rare', 'epic', 'legendary')),
      xp_reward INTEGER DEFAULT 10,
      condition_type TEXT NOT NULL,
      condition_value INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,

    // 19. User Achievements
    `CREATE TABLE IF NOT EXISTS user_achievements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      achievement_id INTEGER NOT NULL,
      earned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (achievement_id) REFERENCES achievements(id) ON DELETE CASCADE,
      UNIQUE(user_id, achievement_id)
    )`,

    // 20. Mentoring Sessions
    `CREATE TABLE IF NOT EXISTS mentoring_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mentor_id INTEGER NOT NULL,
      mentee_id INTEGER NOT NULL,
      topic TEXT NOT NULL,
      description TEXT,
      status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'confirmed', 'completed', 'cancelled')),
      scheduled_at DATETIME NOT NULL,
      duration_minutes INTEGER DEFAULT 60,
      meeting_url TEXT,
      rating INTEGER CHECK(rating >= 1 AND rating <= 5),
      feedback TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (mentor_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (mentee_id) REFERENCES users(id) ON DELETE CASCADE
    )`,

    // 21. Roadmap Items
    `CREATE TABLE IF NOT EXISTS roadmap_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      level TEXT NOT NULL CHECK(level IN ('debutant', 'intermediaire', 'avance')),
      order_index INTEGER NOT NULL,
      resources TEXT,
      projects TEXT,
      tools TEXT,
      duration_weeks INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,

    // 22. Subscribers
    `CREATE TABLE IF NOT EXISTS subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      name TEXT,
      is_active INTEGER DEFAULT 1,
      subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,

    // 23. Reviews
    `CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      course_id INTEGER NOT NULL,
      rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
      comment TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
      UNIQUE(user_id, course_id)
    )`,

    // 24. Notifications
    `CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      type TEXT DEFAULT 'info' CHECK(type IN ('info', 'success', 'warning', 'achievement', 'course', 'community')),
      link TEXT,
      is_read INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`,

    // 25. Leaderboard
    `CREATE TABLE IF NOT EXISTS leaderboard (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL UNIQUE,
      xp_points INTEGER DEFAULT 0,
      level INTEGER DEFAULT 1,
      courses_completed INTEGER DEFAULT 0,
      labs_completed INTEGER DEFAULT 0,
      quizzes_passed INTEGER DEFAULT 0,
      streak_days INTEGER DEFAULT 0,
      rank INTEGER,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`
  ];

  for (const sql of tables) {
    await db.execute(sql);
  }

  console.log('✅ Migration terminée avec succès ! 24 tables créées.');
}

migrate().catch((err) => {
  console.error('❌ Erreur lors de la migration:', err);
  process.exit(1);
});
