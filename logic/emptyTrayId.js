var boardModel = require('../models/Board');
var playerModel = require('../models/Player')
var bodyParser = require('body-parser');

module.exports = {

  // Replace enemy tokens with a blank piece (the backside) so that
  // each player only sees their own tokens.
  emptyTrayId: function(color) {
    var lo;
    var hi;

    if (color=='b') {
      boardModel.findOne({ $and: [ { row: { $gt: 10 } }, { row: { $lt: 15 } } ] },function(error, result) {
        if (error) return error;
        console.log(result);
        return result._id;
      });
    } else {
        boardModel.findOne( { row: { $gt: 14 } },function(error, result) {
          console.log(result);
          if (error) return error;
          return result._id;
      });
    }
  }
}
