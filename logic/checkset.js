
  // Check to see if a move to set a token pre-game is legal

  exports.checkset = function(orgRow,orgCol,orgSpec,dstRow,dstCol,dstSpec) {
    // bad data
    if ((orgRow == dstRow) && (orgCol == dstCol)) return 'same space';
    // make sure we're trying to move into an empty cell
    if (dstSpec != 'empty') return 'occupied';
    // are coords within the appropriate staging area or tray (blue)
    if (orgSpec.CharAt(0) == 'b') {
      if (((orgRow > 4) && (orgRow < 11)) || (orgRow > 14)) {
        return 'out of bounds';
      } else {
        return 'move to empty space';
      }
    // are coords within the appropriate staging area or tray (blue)
    } else if (orgSpec.CharAt(0) == 'r') {
      if ((orgRow < 7) || ((orgRow > 10 ) && (orgRow < 15))) {
        return 'out of bounds';
      } else {
        return 'move to empty space';
      }
    } else {
      return 'cannot move this token';
    }
  }
