const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const util = require('./util');
const esercizi = require('./esercizi');
const esami = require('./esami');
const lezioni = require('./lezioni');
const soluzioni = require('./soluzioni');
const recharge = require('./recharge');
const attivita = require('./attivita');
const meteo = require('./meteo');
const events = require('./events');

const codingConn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'dbpass4root',
  database : 'coding'
});

const monitorConn = mysql.createConnection({
  host     : 'localhost',
  user     : 'usrmonitor',
  password : 'pwdmonitor',
  database : 'monitoring'
});

codingConn.connect();
monitorConn.connect();

const port = process.env.PORT || 8080;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(util(codingConn))
  .use(esercizi(codingConn))
  .use(esami(codingConn))
  .use(lezioni(codingConn))
  .use(soluzioni(codingConn))
  .use(attivita(codingConn))
  .use(events(codingConn))
  .use(meteo(monitorConn))
  .use(recharge());

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
