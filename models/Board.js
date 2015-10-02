var mongoose = require('mongoose');

// 1 declare a schema
// blue for objects
var BoardSchema = new mongoose.Schema({
  row: Number,
  col: Number,
  tokenId: String
});

// 2 export the model
// mongoose.model('string name of model', schema)
module.exports = mongoose.model('Board', BoardSchema);
