# code
An app to store and maintain coding exercises

## express to provide rest api

### install node.js

1. Check Architecture version

        uname -m

output (ARCHVERSION): armv71

2. Get the compiled version of node.js for the architecture

In a temporary directory:

		wget https://nodejs.org/download/release/LASTEST_RELEASE_NUM/node-LASTEST_RELEASE_NUM-linux-ARCHVERSION.tar.gz

3. Extract

        tar -xzf node-LASTEST_RELEASE_NUM-linux-ARCHVERSION.tar.gz

4. Copy the files to a directory in PATH:

        cd node-LASTEST_RELEASE_NUM-linux-ARCHVERSION
        sudo cp -R * /usr/local/

5. Check everything is fine

        node -v

        npm -v

### build RESTful API

1. Create a directory where you want the server side to be

2. Evoke npm initializer

        npm -init

3. Install Express.js and dependencies to access mysql db

        npm install express cors body-parser mysql --save

4. Configuring index.js
	
		const express = require('express');
		const cors = require('cors');
		const bodyParser = require('body-parser');		
		const mysql = require('mysql');
		
		// files queries to db returning json
    	// expected file readings.js in src directory
		
		const readings = require('./readings');
		const connection = mysql.createConnection({
	    host     : 'localhost',
	    user     : 'USERNAME',
	    password : 'USERPASSWORD',
	    database : 'DBNAME'
		});
		
		connection.connect();
		
		// port where the service will be available 
		const port = process.env.PORT || 8080;
		
		const app = express()
		.use(cors())
		.use(bodyParser.json())
		.use(readings(connection));
		// starting the server
		app.listen(port, () => {
			console.log(Express server listening on port ${port});
		});

