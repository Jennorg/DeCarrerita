const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10, // Número máximo de conexiones en el pool
  host: 'localhost',
  user: 'root',
  password: 'uneg122',
  database: 'decarrerita'
});

module.exports = pool;
