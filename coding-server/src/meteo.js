const express = require('express');

function createRouter(db) {
  const router = express.Router();

  router.get('/meteo/day/:day', function (req, res, next) {
    var day = req.params.day;
    day = day.substr(0, 4) + "-" + day.substr(4, 2) + "-" + day.substr(6, 2);
    var strSQL ="SELECT * FROM meteo WHERE ts >= '" + day + "' and ts < DATE_ADD('" + day + "', INTERVAL 1 DAY) ORDER BY ts;";
//    console.log(strSQL);
    db.query(strSQL,
      (error, results) => {
          if (error) {
            console.log(error);
            console.log(strSQL);
            res.status(500).json({status: 'error'});
          } else {
            res.status(200).json(results);
          }
        }
      );
  });

  router.get('/meteo/month/:year/:month', function (req, res, next) {
    var year = req.params.year;
    var month = req.params.month;
    var strSQL ="SELECT * FROM meteo WHERE EXTRACT(YEAR FROM ts) = " + year + " and EXTRACT(MONTH FROM ts) = " + month + " ORDER BY ts;";
 //   console.log(strSQL);
    db.query(strSQL,
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

  router.get('/meteo/last30days/:day', function (req, res, next) {
    var day = req.params.day;
    day = day.substr(0, 4) + "-" + day.substr(4, 2) + "-" + day.substr(6, 2);
    var strSQL ="SELECT * FROM meteo WHERE ts > DATE_ADD('" + day + "' , INTERVAL -30 DAY) and ts <='" + day + "' ORDER BY ts;";
//    console.log(strSQL);
    db.query(strSQL,
      (error, results) => {
          if (error) {
            console.log(error);
            console.log(strSQL);
            res.status(500).json({status: 'error'});
          } else {
            res.status(200).json(results);
          }
        }
      );
  });

  router.get('/meteo/week/:day', function (req, res, next) {
    var day = req.params.day;
    day = day.substr(0, 4) + "-" + day.substr(4, 2) + "-" + day.substr(6, 2);
    var strSQL ="SELECT * FROM meteo WHERE ts > DATE_ADD('" + day + "' , INTERVAL -7 DAY) and ts <='" + day + "' ORDER BY ts;";
//    console.log(strSQL);
    db.query(strSQL,
      (error, results) => {
          if (error) {
            console.log(error);
            console.log(strSQL);
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
