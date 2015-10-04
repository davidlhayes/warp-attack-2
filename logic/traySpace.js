  var boardModel = require('../models/Board');
  var bodyParser = require('body-parser');

  module.exports = {

    function: emptyTrayId(color) {
      var low;
      var hi;
      var id;
      if (color == 'b') {
        low = 101;
        hi = 140;
      } else {
        low = 141;
        hi = 180;
      }
      id = boardModel.findOne({ tokenId: 'empty'}, function(error,result) {
        if (error) return error;
      });
      return id;
    }
  }
