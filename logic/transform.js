  var boardModel = require('../models/Board');
  var bodyParser = require('body-parser');

module.exports = {

  // Create an empty grid - only useful for empty database
  transformBlue: function(o) {
    var temp;
    console.log(o);
    for (var i=0;i<100;i++) {
      if ((i!=42)&&(i!=43)&&(i!=46)&&(i!=47)
        &&(i!=52)&&(i!=53)&&(i!=56)&&(i!=57)) {
        o[i].row = 11-o[i].row;
        o[i].col = 11-o[i].col;
      };
    }
    return o;
  }
}
