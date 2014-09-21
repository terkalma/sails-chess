$(function () {


    console.log('Initalizing application...');

    var ChessBoards = ChessBoards || {};

    ChessBoards.boards = {};

    $('.board').each(function(index, board) {
      ChessBoards.boards[board.id] = new ChessBoard(board.id, {
        draggable: true,
        dropOffBoard: 'trash',
        position: $(board).data('fen'),
        sparePieces: true
      });
    });
});
