const express = require('express');

function createRouter(db) {
  const router = express.Router();

  router.post('/attivita', (req, res, next) => {
    var actDate = Date(req.body.data);
    var aacorso = actDate.getFullYear();
    var nuovoaa = new Date(aacorso + '-09-15');
    var nuovoa = new Date(aacorso + '-01-01');
    if (oggi < nuovoaa && oggi >= nuovoa)
      aacorso = aacorso - 1;
  	db.query(
   	 	'INSERT INTO attivita (data, annoaccademico, tipologia, argomento, numero) VALUES (?,?,"?","?",?)',
    		[new Date(req.body.data), aacorso, req.body.tipologia, req.body.argomento, req.body.numero],
    		(error) => {
      		if (error) {
        		console.error(error);
        		res.status(500).json({status: 'error'});
      		} else {
        		res.status(200).json({status: 'ok'});
      		}
    	}
  	);
  });

  router.get('/attivita/tipologia', (req, res, next) => {
  	db.query(
   	 	'SELECT * FROM tipologialezione',
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
  	);
  });

  // lezioni
  router.get('/attivita/', function (req, res, next) {
    db.query(
      'SELECT * FROM attivita ORDER BY data, numero',
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.get('/attivita/:idanno', function (req, res, next) {
    db.query(
      'SELECT * FROM attivita WHERE annoaccademico = ? ORDER BY data',
      [req.params.idanno],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  // seleziona una attivita
  router.get('/attivita/:id', function (req, res, next) {
    db.query(
      'SELECT * FROM attivita WHERE id=?',
      [req.params.id],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });



  router.get('/numeroattivita', function (req, res, next) {
    db.query(
      'SELECT COUNT(*) AS NUM FROM attivita',
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  // esercizi di una lezione
  router.get('/attivita/:id/esercizi', function (req, res, next) {
    db.query(
      'SELECT * FROM esercizi INNER JOIN attivitaesercizi ON esercizi.id = attivitaesercizi.esercizifk WHERE attivitaesercizi.lezionifk = ?',
      [req.params.id],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });


  return router;
}

module.exports = createRouter;
