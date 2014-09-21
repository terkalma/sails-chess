var ChessBoards = ChessBoards || {};

var ChessBoards = {
  boards : {},

  initHandlersForBoard: function(board) {
    return {}
  },

  init: function() {
    $('.board').each(function(index, board) {

      ChessBoards.initHandlersForBoard(board);

      ChessBoards.boards[board.id] = new ChessBoard(board.id, {
        draggable: true,
        dropOffBoard: 'trash',
        position: $(board).data('fen'),
        sparePieces: true
      });
    });
  }
}

$(function () {
    console.log('Initalizing application...');
    ChessBoards.init();
});
