/**
* Piece.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    color: {
      type: 'boolean',
      required: true,
      defaultsTo: true
    },

    posX: {
      type: 'integer',
      required: true,
      defaultsTo: 0
    },

    posY: {
      type: 'integer',
      required: true,
      defaultsTo: 0
    },

    type: {
      type: 'string',
      required: true
    },

    board: {
      model: 'board'
    }
  }
};
