// Author: Petter Andersson
'use strict';

const util = require('util')
const mysql = require('mysql')


const init = () => {
  if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PW || !process.env.DB_TABLE) {
    console.error('mysql-promisify-pool: Requires env variables: DB_HOST, DB_USER, DB_PW, DB_TABLE');
    // Wait for manual initialization
  }
}

init();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_TABLE
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

  return
})

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query)

module.exports = pool
