const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Acharya1234', // your mysql password
  database: 'bookdb2', // database name
});

module.exports = connection;
