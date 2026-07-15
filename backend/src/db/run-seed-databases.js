/**
 * Standalone script to seed database courses
 * Run: node src/db/run-seed-databases.js
 */
const { getDb } = require('./connection');
const { seedDatabaseCourses } = require('./seed-database-courses');
require('dotenv').config();

async function run() {
  console.log('🗄️  Seeding des cours Base de Données...');
  const db = getDb();
  await seedDatabaseCourses(db);
  console.log('🎉 Terminé !');
  process.exit(0);
}

run().catch(err => {
  console.error('❌ Erreur:', err);
  process.exit(1);
});
