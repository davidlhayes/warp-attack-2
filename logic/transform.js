  var boardModel = require('../models/Board');
  var bodyParser = require('body-parser');

module.exports = {

  // Create an empty grid - only useful for empty database
  transformRed: function(o) {
    var temp;
    console.log(o);
    for (var i=0;i<100;i++) {
        o[i].row = 11-o[i].row;
        o[i].col = 11-o[i].col;
    }
    console.log(o);
  }
}
