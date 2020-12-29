const express = require('express');
const {spawn} = require('child_process');

function createRouter() {
  const router = express.Router();

  // the routes are defined here
  router.post('/recharge/start', (req, res, next) => {
 	 // spawn new child process to call the shell script
	const s = spawn('bash');
	  s.stdin.end(`source /home/pi/Software/bin/logrecharge.sh`);
	  s.once('exit', code => {
		  console.log(`started`);
	  });
  });
  return router;
}

module.exports = createRouter;

