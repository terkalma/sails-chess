/**
 * BoardController
 *
 * @description :: Server-side logic for managing boards
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

// var fen = require('fen');

module.exports = {
	index : function(req, res) {
		Board.find().exec(function (err, boards) {
			res.view({
				boards: boards
			});
		});
	}
};
