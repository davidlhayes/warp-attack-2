  var boardModel = require('../models/Board');
  var bodyParser = require('body-parser');

  module.exports = {
  // Check to see if a move to set a token pre-game is legal
  // if angular can't prevent moving the other player's Token
  // add a check on whose turn and check against token to move
    checkMove: function(orgRow,orgCol,orgSpec,dstRow,dstCol,dstSpec) {
      var step;
      var incr;
      var spc;
      var maxBnd;
      var minBnd;
      //
      // check valid data
      //
      console.log('checkmove:' + orgRow,orgCol,orgSpec,dstRow,dstCol,dstSpec)
      if ((orgRow == dstRow) && (orgCol == dstCol)) return 'same square';
      // can't move onto a star
      if ((orgSpec.charAt(0) == 's')) return 'forbidden';
      // make sure token to move is a player token and not a flag or mine
      if ((orgSpec == 'empty') || (orgSpec.charAt(0) == 'm') ||
          (orgSpec.charAt(0) == 'f') || (orgSpec.charAt(0) == 's')) return 'immovable';
      // make sure all coordinates are on the playing field
      if ((orgRow < 1) || (orgRow > 10) || (orgCol < 1) || (orgCol > 10)) {
        return 'mover out of bounds';
      }
      if ((dstRow < 1) || (dstRow > 10) || (dstCol < 1) || (dstCol > 10)) {
        return 'destination out of bounds';
      }
      //
      // check for move capability
      //
      // rank 9 is uniquely allowed to move any number of unobstructed spaces in
      // its current column or its current row
      // that means we have to check for obstructions and make sure its a column
      // move OR a row move
      if (orgSpec.charAt(0)=='9') {
        spc = 9;
      } else {
        spc = 1;
      }
      if ((orgRow != dstRow) && (orgCol != dstCol)) {
        return 'illegal diagonal move';
      }
      if ((MATH.abs(orgRow-dstRow) > spc) || (MATH.abs(orgCol-dstCol) > spc)) {
        return 'too many space to move';
      }
      // check for obstructions if this is long trip
      if (spc > 1) {
        // column move
        if (orgRow != dstRow) {
          if (MATH.abs(dstRow-orgRow) > 1) {
            if (dstRow > orgRow) {
              maxBnd = dstRow;
              minBnd = orgRow;
            } else {
              maxBnd = orgRow;
              minBnd = dstRow;
            }
            // query the database for a non-empty cell in the patch
            boardModel.find(
              { 'dstSpec': { $ne: 'empty'},'row': orgRow,
                'col': { "$gt": minBnd, "$lt": maxBnd}},
              function(error, result) {
                if (error) return error;
                if (result != null) return 'blocked move';
              });
          }
          // row move
        } else if (orgCol != dstCol) {
          if (MATH.abs(dstCol-orgCol) > 1) {
            if (dstCol > orgCol) {
              maxBnd = dstCol;
              minBnd = orgCol;
            } else {
              maxBnd = orgCol;
              minBnd = dstCol;
            }
            // query the database for a non-empty cell in the patch
            boardModel.find(
              { 'dstSpec': { $ne: 'empty'},
                'row': { "$gt": minBnd, "$lt": maxBnd},
                'col': orgCol },
              function(error, result) {
                if (error) return error;
                if (result != null) return 'blocked move';
              });
            }
          }
        }  // if not returned, that means move is allowed
      // check if empty destination
      if (dstSpec == 'empty') return 'move to empty space';
      // BATTLE!!!
      // Special cases first
      // Spy beats Rank 1
      if ((orgSpec.CharAt(1) == '1') && (dstSpec.CharAt(1) == 's')) return 'defeat';
      if ((orgSpec.CharAt(1) == 's') && (dstSpec.CharAt(1) == '1')) return 'victory';
      // Mine beats anything but rank 8 (mine can only be at destination)
      if (dstSpec.CharAt(1) == 'm') {
        if (orgSpec.CharAt(1) == '8') {
          return 'defeat';
        } else {
          return 'victory';
        }
      }
      // check for flag
      if (dstSpec.CharAt(1) == 'f') return 'win';
      // if you got this far, we're just comparing rank. Low beats high, but
      // equal rank takes out both
      if (orgSpec.CharAt(1) == dstSpec.CharAt(1)) return 'double defeat';
      // and...finally, low rank wins
      if (orgSpec.CharAt(1) < dstSpec.CharAt(1)) {
        return 'victory';
      } else {
        return 'defeat';
      }

    } <!-- end checkMove -->

  }
