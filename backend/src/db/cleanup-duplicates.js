/**
 * Clean up duplicate chapters and lessons.
 * Keeps the first chapter for each (course_id, order_index) combo
 * and deletes the rest along with their lessons.
 */
async function cleanupDuplicates(db) {
  console.log('\n🧹 Nettoyage des doublons...');

  // Step 1: Find duplicate chapters (same course_id + order_index)
  const dupes = await db.execute({
    sql: `SELECT course_id, order_index, COUNT(*) as cnt, MIN(id) as keep_id
          FROM chapters 
          GROUP BY course_id, order_index 
          HAVING COUNT(*) > 1`,
    args: []
  });

  console.log(`  ${dupes.rows.length} groupes de chapitres dupliqués trouvés`);

  let deletedChapters = 0;
  let deletedLessons = 0;

  for (const dupe of dupes.rows) {
    // Delete lessons of duplicate chapters (keep only lessons of the first chapter)
    const lessonsResult = await db.execute({
      sql: `DELETE FROM lessons WHERE chapter_id IN (
              SELECT id FROM chapters 
              WHERE course_id = ? AND order_index = ? AND id != ?
            )`,
      args: [dupe.course_id, dupe.order_index, dupe.keep_id]
    });
    deletedLessons += lessonsResult.rowsAffected || 0;

    // Delete duplicate chapters
    const chapResult = await db.execute({
      sql: `DELETE FROM chapters 
            WHERE course_id = ? AND order_index = ? AND id != ?`,
      args: [dupe.course_id, dupe.order_index, dupe.keep_id]
    });
    deletedChapters += chapResult.rowsAffected || 0;
  }

  // Step 2: Also clean up duplicate lessons within same chapter
  const dupeLessons = await db.execute({
    sql: `SELECT chapter_id, order_index, COUNT(*) as cnt, MIN(id) as keep_id
          FROM lessons 
          GROUP BY chapter_id, order_index 
          HAVING COUNT(*) > 1`,
    args: []
  });

  console.log(`  ${dupeLessons.rows.length} groupes de leçons dupliquées trouvés`);

  for (const dupe of dupeLessons.rows) {
    const result = await db.execute({
      sql: `DELETE FROM lessons 
            WHERE chapter_id = ? AND order_index = ? AND id != ?`,
      args: [dupe.chapter_id, dupe.order_index, dupe.keep_id]
    });
    deletedLessons += result.rowsAffected || 0;
  }

  console.log(`  ✅ Supprimé: ${deletedChapters} chapitres et ${deletedLessons} leçons en double`);
}

module.exports = { cleanupDuplicates };
