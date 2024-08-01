const { Pool } = require('pg');

// Connect to database
const pool = new Pool(
  {
    // TODO: Enter PostgreSQL username
    user: 'postgres',
    // TODO: Enter PostgreSQL password
    password: 'rootroot',
    host: 'localhost',
    database: 'employee_tracker_db',
    port: 5432, // default postgresql port
  },
  console.log(`Connected to the employee_tracker_db database.`)
);

module.exports = pool;