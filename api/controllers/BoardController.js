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
			if (err) return next(err);

			res.view({
				boards: boards
			});
		});
	},

	subscribe: function(req, res) {
		Board.find(function foundUsers(err, boards) {
			if (err) return next(err);

			Board.subscribe(req.socket);
			Board.subscribe(req.socket, boards);

		});
	}
};
