const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 3000;

const { Client } = require('pg');


const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

client.connect();

// prepopulation of med-db for dev purposes

require('./db-prepopulate.js');

// example to query database

client.query('SELECT * FROM Users', (err, res) => {
  console.log(err ? err.stack : res.rows);
  client.end();
});

// example to write api

app.get('/', (req, res) => {
  res.send('Hello World2!');
});

app.listen(port, () => {
  console.log(`Novo Nordisk Medical Management listening at http://localhost:${port}`);
});


