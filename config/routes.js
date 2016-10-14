// Routes received by the Analytics Server

var parser = require('./parser.js');
var addtodb = require('./addToDB.js');

var readability = require('../resources/analyticsControllers/readabilityController.js');
var functionality = require('../resources/analyticsControllers/functionalityController.js');
var general = require('../resources/analyticsControllers/generalController.js');
var javascript = require('../resources/analyticsControllers/javascriptKnowledgeController.js');


module.exports = (app) => {

	/*
	 * @name: /api/analytics/sendcode
	 * @@desc: A route for the user to send code to
	 * @param: {req, res} the request and response for call. 
	 * -->req.body should contain code
	 * @returns: {nothing}
	 */

	 /* Note that the routes to the service will require attention on the
	 	- webserver's services.js / routes.js / repl (folder)

	*/

		app.route('/api/analytics/:userId/functionality')
			.get((req, res) => {
				var url = req.url;

				// 3 and 4 are respectively 'brian' and '1234'
				var urlSplit = url.split('/');

				// the user
				var username = urlSplit[3];

				functionality.getFromDb(req, res, username);

			})

		app.route('/api/analytics/:userId/readability')
			.get((req, res) => {
				var url = req.url;

				// 3 and 4 are respectively 'brian' and '1234'
				var urlSplit = url.split('/');

				// the user
				var username = urlSplit[3];

				readability.getFromDb(req, res, username);

			})

	app.route('/api/analytics/:userId/general')
		.get((req, res) => {
			var url = req.url;

			// 3 and 4 are respectively 'brian' and '1234'
			var urlSplit = url.split('/');

			// the user
			var username = urlSplit[3];

			general.getFromDb(req, res, username);

		})

	app.route('/api/analytics/:userId/javascript')
		.get((req, res) => {
			var url = req.url;

			// 3 and 4 are respectively 'brian' and '1234'
			var urlSplit = url.split('/');

			// the user
			var username = urlSplit[3];

			javascript.getFromDb(req, res, username);
		})

	app.route('/api/analytics/:userId/:problemId')
		.get((req, res) => {
			/* not in use */
		})
		.post((req, res) => { 
			console.log('req value is: ', req);
			// ex is: /api/analytics/brian/1234
			var url = req.url;

			// 3 and 4 are respectively 'brian' and '1234'
			var urlSplit = url.split('/');

			// the user
			var username = urlSplit[3];

			// the problem_ID that the user solved
			var question = urlSplit[4];

			// parsed-results is an object with 4 keys
			var parsed_results = parser(req.body);

			console.log('value for parsed_results 2 is: ', parsed_results);
			// adds all items into our db
			addtodb(parsed_results, username, question);

			res.send('Analytics Received!');
		});
}