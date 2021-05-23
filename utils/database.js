const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'us-cdbr-east-03.cleardb.com',
  user: 'b485ea62c041cf',
  password: 'f6e9a451',
  database: 'heroku_08eb0fba6a8ae9c',
});

// test
// pool.query('select * from food', (err, results) => {
//   console.log(JSON.stringify(results));
//   console.log('database connection successful');
// });

module.exports = pool.promise();
