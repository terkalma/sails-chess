var ChessBoards = ChessBoards || {};

var ChessBoards = {
  boards : {},

  initHandlersForBoard: function(board) {
    return {
      onChange: function(oldPos, newPos) {
        var new_pos = ChessBoard.objToFen(newPos)

        $('#' + board.id.toString()).data('fen', new_pos);

        ChessBoards.editBoard(board.id, new_pos);

      }
    }
  },


  init: function() {
    $('.board').each(function(index, board) {

      callbacks = ChessBoards.initHandlersForBoard(board);

      ChessBoards.boards[board.id] = new ChessBoard(board.id, {
        draggable: true,
        dropOffBoard: 'trash',
        position: $(board).data('fen'),
        sparePieces: true,
        onChange: callbacks.onChange
      });
    });

    io.socket.on('board',function(obj){
      console.log("Caught the event");
      if (obj.verb == 'updated') {

        var data = obj.data;
        if ($('#' + obj.id.toString()).data('fen') != data.fen) {
          console.log(data.fen);
          $('#' + obj.id.toString()).data('fen', data.fen);
          ChessBoards.boards[obj.id].position(data.fen);
        }
        // console.log('User '+previous.name+' has been updated to '+data.name);
      }
    });
  },

  editBoard: function(id, fen) {
    console.log('Updating: ' + id.toString() + "to position: " + fen);
    io.socket.get('boards/update_record',{id: id, fen: fen});
  }
}

$(function () {
    console.log('Initalizing application...');
    ChessBoards.init();
});
