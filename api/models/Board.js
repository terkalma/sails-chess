/**
* Board.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },

    active: {
      type: 'boolean',
      defaultsTo: true
    },

    fen: {
      type: 'string',
      defaultsTo: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
      required: true
    },

    pieces: {
      collection: 'piece',
      via: 'board'
    }
  }
};
