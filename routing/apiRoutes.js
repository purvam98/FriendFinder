
var characters = require("../app/data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
    return res.json(characters);
    });


	app.post('/api/friends', function(req, res) {
		// Capture the user input object
		var userInput = req.body;
		// console.log('userInput = ' + JSON.stringify(userInput));

		var userResponses = userInput.scores;
		// console.log('userResponses = ' + userResponses);

		// Compute best friend match
		var matchName = '';
		var matchImage = '';
		var totalDifference = 10000; // Make the initial value big for comparison

		// Examine all existing friends in the list
		for (var i = 0; i < characters.length; i++) {
			// console.log('friend = ' + JSON.stringify(friends[i]));

			// Compute differenes for each question
			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(characters[i].scores[j] - userResponses[j]);
			}
			// console.log('diff = ' + diff);

			// If lowest difference, record the friend match
			if (diff < totalDifference) {
				console.log('Closest match found = ' + diff);
				console.log('Friend name = ' + characters[i].name);
				console.log('Friend image = ' + characters[i].photo);

				totalDifference = diff;
				matchName = characters[i].name;
				matchImage = characters[i].photo;
			}
		}

		// Add new user
		characters.push(userInput);

		// Send appropriate response
		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
	});
};