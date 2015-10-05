module.exports =
{
  // Check to see if a move to set a token pre-game is legal

  checkSet : function(orgRow,orgCol,orgSpec,dstRow,dstCol,dstSpec) {
    console.log('checkMove ' + orgRow,orgCol,orgSpec,dstRow,dstCol,dstSpec);
    // bad data
    if ((orgRow == dstRow) && (orgCol == dstCol)) return 'same space';
    // are coords within the appropriate staging area or tray (blue)
    if (orgSpec.charAt(0) == 'b') {
      console.log(orgRow);
      if (((dstRow > 4) && (dstRow < 11)) || (dstRow > 14)) {
        console.log('Blue dstRow ' + dstRow);
        return 'out of bounds';
        // make sure we're trying to move into an empty cell
      } else if (dstSpec != 'empty') {
        return 'occupied'
      } else {
        return 'move to empty space';
      }
      // are coords within the appropriate staging area or tray (blue)
    } else if (orgSpec.charAt(0) == 'r') {
      if ((dstRow < 7) || ((dstRow > 10 ) && (dstRow < 15))) {
        console.log('Red dstRow ' + dstRow);
        return 'out of bounds';
        // make sure we're trying to move into an empty cell
      } else if (dstSpec != 'empty') {
        return 'occupied'
      } else {
        return 'move to empty space';
      }
    } else {
      return 'not a token';
    }
    console.log('exit checkSet');
  }
};
