const express = require('express');

function createRouter(db) {
  const router = express.Router();

  // the routes are defined here
  router.post('/esercizio', (req, res, next) => {
    db.query(
     	 	'INSERT INTO esercizi (titolo, testo, argomento, colore) VALUES (?,?,?,?)',
      		[req.body.titolo, req.body.testo, req.body.argomento, req.body.colore],
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

  router.route('/book').post((req, res, next) => {
    db.query(
        'INSERT INTO esercizi (titolo, testo, argomento, colore) VALUES (?,?,?,?)',
        [req.body.titolo, req.body.testo, req.body.argomento, req.body.colore],
        (error) => {
            if (error) {
              res.status(500).json({status: 'error'});
            } else {
              res.status(200).json({status: 'ok'});
            }
      })
  });

  router.get('/esercizi', function (req, res, next) {
    db.query(
      'SELECT * FROM esercizi LIMIT 9 OFFSET ?',
      [9*(req.query.page || 0)],
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

  router.get('/esercizi/:topic', function (req, res, next) {
    db.query(
      'SELECT * FROM esercizi WHERE argomento LIKE %?% LIMIT 9 OFFSET ?',
      [req.params.topic, 9*(req.query.page || 0)],
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

  router.get('/esercizio/:id', function (req, res, next) {
    db.query(
      'SELECT * FROM esercizi WHERE id=?',
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

	router.put('/esercizio/:id', function (req, res, next) {
  		db.query(
    			'UPDATE esercizi SET titolo=?, testo=?, argomento=?, colore=? WHERE id=?',
    			[req.body.titolo, req.body.testo, req.body.argomento, req.body.colore, req.params.id],
    			(error) => {
      				if (error) {
        				res.status(500).json({status: 'error'});
      				} else {
        				res.status(200).json({status: 'ok'});
      				}
   	 		}
  			);
	});

	router.delete('/esercizio/:id', function (req, res, next) {
  		db.query(
    			'DELETE FROM esercizi WHERE id=?',
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

  router.get('/esercizio/:id/soluzioni', function (req, res, next) {
    db.query(
      'SELECT * FROM soluzioni WHERE esercizifk=?',
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

  // esami in cui e' stato usato un eserizio
  router.get('/esercizio/:id/esami', function (req, res, next) {
    db.query(
      'SELECT * FROM esami INNER JOIN eserciziesame ON esami.id = eserciziesame.esamifk WHERE eserciziesame.esercizifk =?',
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
