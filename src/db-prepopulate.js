const { Client } = require('pg');
const fs = require('fs');

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

client.connect();

console.log('Prepopulating database...');

client.query(`
  CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    username text NOT NULL,
    email text NOT NULL
  );
`, (err, res) => {
  console.log(err ? err.stack : 'Users table created');

  fs.readFile('src/db-dev-data/users.json', 'utf8', (err, data) => {
    if (err) throw err;
    const users = JSON.parse(data);

    users.forEach((user) => {
      client.query(`
        SELECT * FROM users WHERE username = $1 AND email = $2;
      `, [user.username, user.email], (err, res) => {
        if (err) throw err;

        if (res.rowCount === 0) {
          client.query(`
            INSERT INTO users (username, email)
            VALUES ($1, $2);
          `, [user.username, user.email], (err, res) => {
            console.log(err ? err.stack : `Data inserted into users table: ${user.username}, ${user.email}`);
          });
        } else {
          console.log(`Data already exists in users table: ${user.username}, ${user.email}, no need to pre-populate`);
        }
      });
    });
  });
});
