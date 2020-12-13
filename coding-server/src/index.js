const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const esercizi = require('./esercizi');
const esami = require('./esami');
const soluzioni = require('./soluzioni');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'dbpass4root',
  database : 'coding'
});

connection.connect();

const port = process.env.PORT || 8080;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(esercizi(connection))
  .use(esami(connection))
  .use(soluzioni(connection));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
