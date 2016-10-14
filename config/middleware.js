// middleware for our Analytics Service

const bodyParser = require('body-parser');
const morgan = require('morgan');

module.exports = (app, express) => {
	// Print all of the requests to the server
	app.use(morgan('dev'));

	// Reads Information from forms ands put it in a body object
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	// Add headers
	app.use(function (req, res, next) {

	  // Website you wish to allow to connect
	  res.setHeader('Access-Control-Allow-Origin', 'http://ec2-52-91-116-191.compute-1.amazonaws.com');

	  // Request methods you wish to allow
	  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	  // Request headers you wish to allow
	  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	  // Set to true if you need the website to include cookies in the requests sent
	  // to the API (e.g. in case you use sessions)
	  res.setHeader('Access-Control-Allow-Credentials', true);

	  // Pass to next layer of middleware
	  next();
	});

}
