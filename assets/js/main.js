var ChessBoards = ChessBoards || {};

var ChessBoards = {
  boards : {},

  initHandlersForBoard: function(board) {
    return {
      onChange: function(oldPos, newPos) {
        var old_pos = ChessBoard.objToFen(oldPos);
        var new_pos = ChessBoard.objToFen(newPos);

        if (old_pos != new_pos) {
          $('#' + board.id.toString()).data('fen', new_pos);
          ChessBoards.editBoard(board.id, new_pos);
        }
      }
    }
  },

  bindEventHandlers: function(board) {
    $('.clear').on('click', function(e) {
      e.preventDefault();

      var $this = $(this),
          id = 0;
      id = ChessBoards.getId($this);
      ChessBoards.boards[id].clear();
    });

    $('.reset').on('click', function(e) {
      e.preventDefault();

      var $this = $(this),
          id = 0;
      id = ChessBoards.getId($this);
      ChessBoards.boards[id].start();
    });

    $('.fen-form').on('submit', function(e) {
      e.preventDefault();
      var data = $(this).serializeArray();
      id = ChessBoards.getId($(this));
      ChessBoards.boards[id].position(data[0].value);
    });
  },

  getId: function($this) {
    return $this.closest('.board-container').find('.board').first().attr('id');
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

      ChessBoards.bindEventHandlers();
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
      }
    });
  },

  editBoard: function(id, fen) {
    console.log('Updating: ' + id.toString() + " to position: " + fen);
    io.socket.get('boards/update_record',{id: id, fen: fen});
  }
}

$(function () {
    console.log('Initalizing application...');
    ChessBoards.init();
});
