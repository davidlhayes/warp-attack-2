  var boardModel = require('../models/Board');
  var playerModel = require('../models/Player')
  var bodyParser = require('body-parser');

  module.exports = {

    // Replace enemy tokens with a blank piece (the backside) so that
    // each player only sees their own tokens.
    hideTokens: function(player,o) {
      var temp;
      var repl;
      if (player == 'blue') {
        repl = 'rback';
        ltr = 'r';
      } else {
        repl = 'bback';
        ltr = 'b'
      }
      for (var i=0;i<100;i++) {
        if (o[i].tokenSpec.charAt(1) == ltr) {
            o[i].tokenSpec = repl;
        }
      }
      return o;
    }
  }
