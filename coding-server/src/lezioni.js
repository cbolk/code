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


  return router;
}

module.exports = createRouter;
