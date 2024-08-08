const { Pool } = require('pg');

// Connect to database
const pool = new Pool(
  {
    user: 'postgres',
    password: 'rootroot',
    host: 'localhost',
    database: 'employee_tracker_db',
    port: 5432, // default postgresql port
  },
  console.log(`Connected to the employee_tracker_db database.`)
);

module.exports = pool;