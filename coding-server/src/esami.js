const express = require('express');

function createRouter(db) {
  const router = express.Router();

  // the routes are defined here
  router.post('/esame', (req, res, next) => {
  	db.query(
   	 	'INSERT INTO esami (data, anno) VALUES (?,?)',
    		[new Date(req.body.data), req.body.anno],
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

  router.get('/esami', function (req, res, next) {
  db.query(
    'SELECT id, data, anno FROM esami LIMIT 10 OFFSET ?',
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

  router.get('/esamicompleti', function (req, res, next) {
  db.query(
    'SELECT esami.*, esercizi.* FROM esami INNER JOIN eserciziesame ' + 
    'ON esami.id = eserciziesame.esamifk INNER JOIN esercizi ON ' +
    'eserciziesame.esercizifk = esercizi.id ORDER BY eserciziesame.ordine LIMIT 10 OFFSET ?',
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


	router.put('/esame/:id', function (req, res, next) {
  		db.query(
    			'UPDATE esami SET data=?, anno=? WHERE id=?',
    			[new Date(req.body.data), req.body.anno, req.params.id],
    			(error) => {
      				if (error) {
        				res.status(500).json({status: 'error'});
      				} else {
        				res.status(200).json({status: 'ok'});
      				}
   	 		}
  			);
	});

	router.delete('/esame/:id', function (req, res, next) {
  		db.query(
    			'DELETE FROM esami WHERE id=?',
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

