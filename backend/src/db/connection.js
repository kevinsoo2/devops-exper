const { createClient } = require('@libsql/client');
require('dotenv').config();

let db = null;

function getDb() {
  if (!db) {
    db = createClient({
      url: process.env.TURSO_DATABASE_URL || 'file:local.db',
      authToken: process.env.TURSO_AUTH_TOKEN || undefined
    });
  }
  return db;
}

module.exports = { getDb };
