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

    pieces: {
      collection: 'piece',
      via: 'board'
    }
  },

  toFen: function() {
    attributes.pieces.forEach(function (piece) {
      console.log(piece);
    })

    return 'test'
  }
};
