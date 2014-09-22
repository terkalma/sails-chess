/**
 * BoardController
 *
 * @description :: Server-side logic for managing boards
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index : function(req, res) {
		Board.find().exec(function (err, boards) {
			if (err) return next(err);

			res.view({
				boards: boards
			});
		});
	},

	update_record : function(req, res) {
		var idSent = req.param('id');
		var newFen = req.param('fen');

		if (idSent && newFen && req.isSocket) {
			Board.update({id: idSent},{fen: newFen}).exec(function (err, updated) {
				if (!err) {
					Board.publishUpdate(updated[0].id, {fen: newFen});
				}
			});
		}
	},

	subscribe: function(req, res) {
		if (req.isSocket) {
			Board.find(function foundUsers(err, boards) {
				if (!err) {
					Board.subscribe(req.socket, boards);
				}
			});
		}
	}
};
