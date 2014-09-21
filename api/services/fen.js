module.exports = function(board) {

  var table = buildEmptyTable();

  board.pieces.forEach(function(piece) {
    table[piece.posX-1][piece.posY-1] = getPieceName(piece)
  });

  return buildFenFromTable(table)
};

function buildEmptyTable() {
  var table = [];

  for(var i=0; i<8; i++) {
    table[i] = new Array(8);
  }

  return table;
}

function buildFenFromTable(table) {
  var fen = '',
      counter = 0;

  for (var i=8; i--;) {

    counter = 0;

    for (var j=0; j < 8; j++) {
      if (table[i][j]) {
        if (counter > 0) {
          fen += counter.toString();
          counter = 0;
        }

        fen += table[i][j];
      } else {
        counter += 1;
      }
    }

    if (counter > 0) {
      fen += counter.toString();
    }

    if (i > 0) {
      fen += '/';
    }
  }

  return fen;
}

function getPieceName(piece) {
  if (piece.color) {
    return piece.type.toUpperCase();
  } else {
    return piece.type.toLowerCase();
  }
}
