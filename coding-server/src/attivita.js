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
   	 	'INSERT INTO attivita (data, annoaccademico, tipologia, titolo, argomento, numero, cb) VALUES (?,?, "?", "?","?",?, ?)',
    		[new Date(req.body.data), aacorso, req.body.tipologia, req.body.titolo, req.body.argomento, req.body.numero, req.body.cb],
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

  router.put('/attivita/:id', function (req, res, next) {
    var actDate = Date(req.body.data);
    var aacorso = actDate.getFullYear();
    var nuovoaa = new Date(aacorso + '-09-15');
    var nuovoa = new Date(aacorso + '-01-01');
    if (oggi < nuovoaa && oggi >= nuovoa)
      aacorso = aacorso - 1;
    db.query(
      'UPDATE attivita SET data=?, tipologia=?, titolo=?, argomento=?, numero=?, cb=? WHERE id=?',
        [new Date(req.body.data), aacorso, req.body.tipologia, req.body.titolo, req.body.argomento, req.body.numero, req.body.cb, req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });  

  router.delete('/attivita/:id', function (req, res, next) {
    db.query(
      'DELETE FROM attivita WHERE id=?',
      [req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
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
