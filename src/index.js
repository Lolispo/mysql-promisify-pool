// Author: Petter Andersson
'use strict';

const util = require('util')
const mysql = require('mysql')

let pool = null;

module.exports.getPool = () => {
  return pool;
}

const initialize = (DB_HOST, DB_USER, DB_PW, DB_NAME) => {
  pool = mysql.createPool({
    connectionLimit: 10,
    host: DB_HOST,
    user: DB_USER,
    password: DB_PW,
    database: DB_NAME
  })

  // Ping database to check for common exception errors.
  pool.getConnection((err, connection) => {
    if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.')
      }
      if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has too many connections.')
      }
      if (err.code === 'ECONNREFUSED') {
        console.error('Database connection was refused.')
      }
    }

    if (connection) connection.release()

    return;
  })
  // Promisify for Node.js async/await.
  pool.query = util.promisify(pool.query)

  return pool;
}

module.exports.initialize = (DB_HOST, DB_USER, DB_PW, DB_NAME) => {
  return initialize(DB_HOST, DB_USER, DB_PW, DB_NAME);
}

module.exports.initialize = () => {
  if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PW || !process.env.DB_NAME) {
    console.error('mysql-promisify-pool: Requires env variables: DB_HOST, DB_USER, DB_PW, DB_NAME');
    // Wait for manual initialization
    console.error('use init with parameters instead');
    return null;
  } else {
    initialize(
      process.env.DB_HOST,
      process.env.DB_USER,
      process.env.DB_PW,
      process.env.DB_NAME
    );
  }
}

//module.exports = pool;
