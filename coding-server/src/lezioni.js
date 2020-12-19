const express = require('express');

function createRouter(db) {
  const router = express.Router();

  router.post('/lezione', (req, res, next) => {
  	db.query(
   	 	'INSERT INTO lezione (data, annoaccademico, tipologia, argomento) VALUES (?,?,?,?)',
    		[new Date(req.body.data), req.body.annoaccademico, req.body.tipologia, req.body.argomento],
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

  router.get('/lezioni/tipologia', (req, res, next) => {
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
  router.get('/lezioni/', function (req, res, next) {
    db.query(
      'SELECT * FROM lezioni ORDER BY data',
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

  // lezioni di un anno accademico
  router.get('/lezione/:id', function (req, res, next) {
    db.query(
      'SELECT * FROM lezioni WHERE id=?',
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

  // lezioni di un anno accademico
  router.get('/lezioni/:idanno', function (req, res, next) {
    db.query(
      'SELECT * FROM lezioni ORDER BY data WHERE annoaccademico=?',
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

  router.get('/numerolezioni', function (req, res, next) {
    db.query(
      'SELECT COUNT(*) AS NUM FROM lezioni',
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
  router.get('/lezione/:id/esercizi', function (req, res, next) {
    db.query(
      'SELECT * FROM esercizi INNER JOIN lezioniesercizi ON esercizi.id = lezioniesercizi.esercizifk WHERE lezioniesercizi.lezionifk = ?',
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
