const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10, // Número máximo de conexiones en el pool
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'decarrerita'
});

module.exports = pool;