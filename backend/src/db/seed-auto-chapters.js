/**
 * Auto-generate chapters and lessons for courses that have none.
 * Uses the course learning_outcomes to create meaningful chapter titles.
 */
async function seedAutoChapters(db) {
  console.log('\n📖 Génération auto des chapitres et leçons...');

  // Find courses without chapters
  const result = await db.execute({
    sql: `SELECT c.id, c.title, c.slug, c.category, c.level, c.duration_hours, c.learning_outcomes 
          FROM courses c 
          LEFT JOIN chapters ch ON ch.course_id = c.id 
          WHERE ch.id IS NULL AND c.is_published = 1`,
    args: []
  });

  const coursesWithoutContent = result.rows;
  console.log(`  ${coursesWithoutContent.length} cours sans contenu trouvés`);

  for (const course of coursesWithoutContent) {
    let outcomes = [];
    try {
      outcomes = JSON.parse(course.learning_outcomes || '[]');
    } catch { outcomes = []; }

    if (outcomes.length === 0) {
      outcomes = [
        'Introduction et concepts fondamentaux',
        'Installation et configuration',
        'Utilisation de base',
        'Fonctionnalités avancées',
        'Bonnes pratiques et production',
      ];
    }

    // Create chapters based on learning outcomes
    const numChapters = Math.min(outcomes.length, 8);
    const durationPerChapter = Math.round((course.duration_hours * 60) / numChapters);

    for (let i = 0; i < numChapters; i++) {
      const chapterTitle = outcomes[i];
      
      await db.execute({
        sql: `INSERT OR IGNORE INTO chapters (course_id, title, description, order_index, duration_minutes) 
              VALUES (?, ?, ?, ?, ?)`,
        args: [course.id, chapterTitle, `Chapitre ${i + 1} du cours ${course.title}`, i + 1, durationPerChapter]
      });

      // Get the chapter ID
      const chResult = await db.execute({
        sql: `SELECT id FROM chapters WHERE course_id = ? AND order_index = ?`,
        args: [course.id, i + 1]
      });

      if (chResult.rows.length === 0) continue;
      const chapterId = chResult.rows[0].id;

      // Generate lessons for this chapter (4-7 lessons per chapter)
      const numLessons = 4 + Math.floor(Math.random() * 4); // 4 to 7
      const lessonDuration = Math.round(durationPerChapter / numLessons);

      const lessonTemplates = generateLessonTitles(chapterTitle, course.category, numLessons);

      for (let j = 0; j < lessonTemplates.length; j++) {
        await db.execute({
          sql: `INSERT OR IGNORE INTO lessons (chapter_id, title, content_type, duration_minutes, order_index, is_free, xp_reward) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
          args: [chapterId, lessonTemplates[j], 'text', lessonDuration, j + 1, j === 0 ? 1 : 0, 15]
        });
      }
    }
    console.log(`  ✅ ${course.title}: ${numChapters} chapitres créés`);
  }

  console.log(`\n✅ Contenu généré pour ${coursesWithoutContent.length} cours`);
}

function generateLessonTitles(chapterTitle, category, count) {
  // Generate contextual lesson titles based on chapter
  const title = chapterTitle.toLowerCase();
  const lessons = [];

  // Generic patterns that work for any topic
  const introPatterns = [
    `Introduction : ${chapterTitle}`,
    `Concepts clés et terminologie`,
    `Architecture et composants`,
    `Prérequis et environnement`,
  ];

  const practicePatterns = [
    `Configuration et mise en place`,
    `Exercice pratique guidé`,
    `Cas d'usage en production`,
    `Troubleshooting et erreurs courantes`,
    `Bonnes pratiques et recommandations`,
    `Optimisation et performance`,
    `Sécurité et conformité`,
  ];

  // First lesson is always intro
  lessons.push(introPatterns[0]);

  // Fill with contextual content
  if (title.includes('install') || title.includes('configur') || title.includes('déploy')) {
    lessons.push('Prérequis et préparation de l\'environnement');
    lessons.push('Procédure d\'installation pas à pas');
    lessons.push('Configuration initiale et paramétrage');
    lessons.push('Vérification et tests post-installation');
    lessons.push('Automatisation de l\'installation');
  } else if (title.includes('sécuri') || title.includes('protect') || title.includes('chiffr')) {
    lessons.push('Évaluation des risques et menaces');
    lessons.push('Mise en place des contrôles de sécurité');
    lessons.push('Chiffrement et gestion des certificats');
    lessons.push('Audit et conformité');
    lessons.push('Réponse aux incidents');
  } else if (title.includes('monitor') || title.includes('observ') || title.includes('log')) {
    lessons.push('Métriques clés à surveiller');
    lessons.push('Configuration des dashboards');
    lessons.push('Alerting et notifications');
    lessons.push('Analyse des logs et corrélation');
    lessons.push('Capacity planning');
  } else if (title.includes('performance') || title.includes('optimi') || title.includes('tuning')) {
    lessons.push('Identification des goulots d\'étranglement');
    lessons.push('Outils de profiling et diagnostic');
    lessons.push('Techniques d\'optimisation');
    lessons.push('Benchmarking et métriques');
    lessons.push('Automatisation du tuning');
  } else if (title.includes('réplication') || title.includes('haute disp') || title.includes('cluster')) {
    lessons.push('Architecture haute disponibilité');
    lessons.push('Configuration de la réplication');
    lessons.push('Failover automatique');
    lessons.push('Monitoring du cluster');
    lessons.push('Tests de résilience');
  } else {
    // Generic pattern
    lessons.push(`Concepts fondamentaux`);
    lessons.push(`Configuration et paramétrage`);
    lessons.push(`Utilisation pratique`);
    lessons.push(`Cas d'usage avancés`);
    lessons.push(`Bonnes pratiques en production`);
    lessons.push(`Troubleshooting et FAQ`);
  }

  // Ensure we have exactly 'count' lessons
  while (lessons.length < count) {
    lessons.push(practicePatterns[lessons.length % practicePatterns.length]);
  }

  return lessons.slice(0, count);
}

module.exports = { seedAutoChapters };
