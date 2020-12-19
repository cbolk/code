const express = require('express');

function createRouter(db) {
  const router = express.Router();

  // the routes are defined here
  router.post('/soluzione', (req, res, next) => {
  	db.query(
   	 	'INSERT INTO soluzioni (codice, commento, esercizifk) VALUES (?,?,?)',
    		[req.body.codice, req.body.commento, req.body.esercizifk],
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

  router.get('/soluzioni/:eid', function (req, res, next) {
    db.query(
      'SELECT * FROM soluzioni INNER JOIN esercizi on soluzioni.esercizifk = esercizi.id WHERE esercizi.id = ?',
      [10*(req.params.page || 0)],
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

  router.get('/lezione/:id/soluzioni', function (req, res, next) {
    db.query(
      'SELECT soluzioni.* FROM soluzioni INNER JOIN esercizi on soluzioni.esercizifk = esercizi.id INNER JOIN lezioniesercizi on esercizi.id = lezioniesercizi.esercizifk WHERE lezioniesercizi.lezionifk = ?',
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

  router.get('/soluzione/:id', function (req, res, next) {
    db.query(
      'SELECT * FROM soluzioni WHERE id=?',
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

	router.put('/soluzione/:id', function (req, res, next) {
  		db.query(
    			'UPDATE soluzioni SET codice=?, commento=?, esercizifk=? WHERE id=?',
    			[req.body.codice, req.body.commento, req.body.esercizifk, req.params.id],
    			(error) => {
      				if (error) {
        				res.status(500).json({status: 'error'});
      				} else {
        				res.status(200).json({status: 'ok'});
      				}
   	 		}
  			);
	});

	router.delete('/soluzione/:id', function (req, res, next) {
  		db.query(
    			'DELETE FROM soluzioni WHERE id=?',
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


  return router;
}

module.exports = createRouter;
