  var express = require('express');
  var controller = express.Router();

  var boardModel = require('../models/Board');
  var bodyParser = require('body-parser');
  var transform = require('../logic/transform');
  var playerModel = require('../models/Player');
  var hideTokens = require('../logic/hideTokens');
  var checkSet = require('../logic/checkSet');
  var checkMove = require('../logic/checkMove')
  // var tools = require('./tools');
  // var checkMove = require('./tools');
  var friend = 'Matt';
  console.log(typeof checkMove.checkMove);
  // Board API -- set board tokens, move tokens (as governed by game rules)
 //  and get token placement information

  // boardDelete
  controller.delete('/', function(req, res, next) {
    boardModel.collection.remove();
    boardModel.find(function(error,tokens) {
      if (error) return error;
      res.json(tokens);
    });
  });

  // boardInitialize
  controller.post('/', function(req, res, next) {
      var cell = { 'row' : 0, 'col' : 0, tokenSpec : 'none'};
      for (var i=1; i<19; i++) {
        for (var j=1; j<11; j++) {
          cell.row = i.toString();
          cell.col = j.toString();
          cell.tokenSpec = 'empty';
          // console.log('cell');
          // console.log(cell);
          boardModel.create(cell, function(error, token) {
            if (error) return error;
          });
        }
      }
      boardModel.find(function(error,tokens) {
        if (error) return error;
        res.json(tokens);
      });
  });

  // boardInitialize
  controller.post('/special', function(req, res, next) {

      boardModel.findOne({'tokenSpec':'r5'},function(error,tokens) {
        if (error) return error;
        boardModel.findByIdAndUpdate(tokens._id, { 'tokenSpec':'b4'}, function(error, token) {
          if (error) return error;
          });
        });

        boardModel.find(function(error,tokens) {
          if (error) return error;
          res.json(tokens);
        });

      // boardModel.findAndModify({query:{'tokenSpec':'r5'},update:{'tokenSpec':'r2'}},function(error,tokens) {
      //   if (error) return error;
      //   res.json(tokens._id);
      // });
  });

// set empty field and full trays
  controller.put('/trays', function(req, res, next) {

    var blues = [ 1,2,3,3,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,8,
                    9,9,9,9,9,9,9,9,'m','m','m','m','m','m','s','f' ];
    var reds = [ 1,2,3,3,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,8,
                    9,9,9,9,9,9,9,9,'m','m','m','m','m','m','s','f' ];
    var length;

    boardModel.find(function(error,tokens) {
        if (error) return error;
    // if size is inadequate, clear the object and initialize an empty board
    if (tokens.length<180) {
      boardModel.collection.remove();
      var cell = { 'row' : 0, 'col' : 0, tokenSpec : 'none'};
      for (var i=1; i<19; i++) {
        for (var j=1; j<11; j++) {
          cell.row = i.toString();
          cell.col = j.toString();
          cell.tokenSpec = 'empty';
          // console.log('cell');
          // console.log(cell);
          boardModel.create(cell, function(error, token) {
            if (error) return error;
          });
        }
      }
    };
    // fill the field with empty squares and the trays with the allotted army
    for (var i=1; i<19; i++) {
      for (var j=1; j<11; j++) {
        if (i<11) {
            boardModel.update({'row': i, 'col': j },{$set: {'tokenSpec': 'empty' }},function(error,tokens) {
              if (error) return error;
            });
          } else if (i<15) {
            cell = 'b' + blues.pop();
            boardModel.update({'row': i, 'col': j },{$set: {'tokenSpec': cell }},function(error,tokens) {
              if (error) return error;
            });
          } else {
            cell = 'r' + reds.pop();
            boardModel.update({'row': i, 'col': j },{$set: {'tokenSpec': cell }},function(error,tokens) {
              if (error) return error;
            });
          }
      }
      // set up the dmz
      // left center
      boardModel.update({'row': 5, 'col': 3 },{$set: {'tokenSpec': 'star-tl' }},function(error,tokens) {
        if (error) return error;
      });
      boardModel.update({'row': 5, 'col': 4 },{$set: {'tokenSpec': 'star-tr' }},function(error,tokens) {
        if (error) return error;
      });
      boardModel.update({'row': 6, 'col': 3 },{$set: {'tokenSpec': 'star-bl' }},function(error,tokens) {
        if (error) return error;
      });
      boardModel.update({'row': 6, 'col': 4 },{$set: {'tokenSpec': 'star-br' }},function(error,tokens) {
        if (error) return error;
      });
      // right center
      boardModel.update({'row': 5, 'col': 7 },{$set: {'tokenSpec': 'star-tl' }},function(error,tokens) {
        if (error) return error;
      });
      boardModel.update({'row': 5, 'col': 8 },{$set: {'tokenSpec': 'star-tr' }},function(error,tokens) {
        if (error) return error;
      });
      boardModel.update({'row': 6, 'col': 7 },{$set: {'tokenSpec': 'star-bl' }},function(error,tokens) {
        if (error) return error;
      });
      boardModel.update({'row': 6, 'col': 8 },{$set: {'tokenSpec': 'star-br' }},function(error,tokens) {
        if (error) return error;
      });
    }
      // returns the board json
      boardModel.find(function(error,tokens) {
        if (error) return error;
        res.json(tokens);
      });
    });
  });

  // reset blue tray
  controller.put('/bluetray', function(req, res, next) {
    // if anything was passed as an argument, this is a quick set

    var blues = [ 1,2,3,3,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,8,
                  9,9,9,9,9,9,9,9,'m','m','m','m','m','m','s','f' ];

    // check current object size
    boardModel.find(function(error,tokens) {
      if (error) return error;
      // make sure the board size is adequate
      if (tokens.length=180) {
        // fill the blue staging area on the field with empty squares
        for (var i=1; i<=4; i++) {
          for (var j=1; j<=10; j++) {
            cell = 'empty';
            boardModel.update({'row': i, 'col': j },{$set: {'tokenSpec': cell }},function(error,tokens) {
              if (error) return error;
            });
          }
        };
        // fill the blue tray with all the blue tokens
        for (var i=11; i<=14; i++) {
          for (var j=1; j<=10; j++) {
            cell = 'b' + blues.pop();
            boardModel.update({'row': i, 'col': j },{$set: {'tokenSpec': cell }},function(error,tokens) {
              if (error) return error;
            });
          }
        };
        // returns the board json
        boardModel.find(function(error,tokens) {
          if (error) return error;
          res.json(tokens);
        });
      }
    });
  });

  // reset blue tray
  controller.put('/bluefield', function(req, res, next) {
    // if anything was passed as an argument, this is a quick set

    var blues = [ 1,2,3,3,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,8,
                    9,9,9,9,9,9,9,9,'m','m','m','m','m','m','s','f' ];

    // check current object size
    boardModel.find(function(error,tokens) {
      if (error) return error;
      // make sure the board size is adequate
      if (tokens.length=180) {
        // fill the blue staging area on the field with empty squares
        for (var i=1; i<=4; i++) {
          for (var j=1; j<=10; j++) {
            cell = 'b' + blues.pop();
            boardModel.update({'row': i, 'col': j },{$set: {'tokenSpec': cell }},function(error,tokens) {
              if (error) return error;
            });
          }
        };
        // fill the blue tray with all the blue tokens
        for (var i=11; i<=14; i++) {
          for (var j=1; j<=10; j++) {
            cell = 'empty';
            boardModel.update({'row': i, 'col': j },{$set: {'tokenSpec': cell }},function(error,tokens) {
              if (error) return error;
            });
          }
        };
        // returns the board json
        boardModel.find(function(error,tokens) {
          if (error) return error;
          res.json(tokens);
        });
      }
    });
  });

  // reset red tray
  controller.put('/redtray', function(req, res, next) {
    // if anything was passed as an argument, this is a quick set
    var reds = [ 1,2,3,3,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,8,
                  9,9,9,9,9,9,9,9,'m','m','m','m','m','m','s','f' ];
    // console.log(req.body);
    // check current object size
    boardModel.find(function(error,tokens) {
        if (error) return error;
      // make sure the board size is adequate
      if (tokens.length=180) {
        // fill the red staging area on the field with empty squares
        for (var i=7; i<=10; i++) {
          for (var j=1; j<=10; j++) {
            cell = 'empty';
            boardModel.update({'row': i, 'col': j },{$set: {'tokenSpec': cell }},function(error,tokens) {
              if (error) return error;
            });
          }
        }
        // fill the red tray with all the red tokens
        for (var i=15; i<=18; i++) {
          for (var j=1; j<=10; j++) {
            cell = 'r' + reds.pop();
             boardModel.update({'row': i, 'col': j },{$set: {'tokenSpec': cell }},function(error,tokens) {
              if (error) return error;
            });
          }
        };

        // returns the board json
        boardModel.find(function(error,tokens) {
          if (error) return error;
          res.json(tokens);
        });
      }
    });
  });

  // quick set red field
  controller.put('/redfield', function(req, res, next) {
    // if anything was passed as an argument, this is a quick set
      // useful sample arrangement
    var reds = [ 5 , 8 , 6 ,'m','f', 4 ,'m', 9 , 6 , 7 ,
                'm', 7 , 3 , 5 , 9 , 1 ,'m', 9 , 9 , 4 ,
                 5 , 3 ,'s', 6 , 2 , 8 , 7 , 8 , 5 ,'m',
                 9 ,'m', 8 , 7 , 9 , 4 , 9 , 8 , 6 , 9];

    // console.log(req.body);
    // check current object size
    boardModel.find(function(error,tokens) {
        if (error) return error;
      // make sure the board size is adequate
      if (tokens.length=180) {
        // fill the red staging area on the field with empty squares
        for (var i=7; i<=10; i++) {
          for (var j=1; j<=10; j++) {
            // if req.body is non-null, this is a quick set. Fill the field
            cell = 'r' + reds.pop();
            boardModel.update({'row': i, 'col': j },{$set: {'tokenSpec': cell }},function(error,tokens) {
              if (error) return error;
            });
          }
        }
        // fill the red tray with all the red tokens
        for (var i=15; i<=18; i++) {
          for (var j=1; j<=10; j++) {
            cell = 'empty';
            boardModel.update({'row': i, 'col': j },{$set: {'tokenSpec': cell }},function(error,tokens) {
              if (error) return error;
            });
          }
        };
        // returns the board json
        boardModel.find(function(error,tokens) {
          if (error) return error;
          res.json(tokens);
        });
      }
    });
  });


  // get all
  controller.get('/', function(req, res, next) {
    boardModel.find(function(error,tokens) {
      if (error) return error;
      res.json(tokens);
    });
  });

  // get all for blue
  controller.get('/blue', function(req, res, next) {
    boardModel.find(function(error,tokens) {
      if (error) return error;
      // send out a reversed board;
      var t = transform.transformBlue(tokens);
      // replace red tokens with red backs
      console.log('get blue ' + t[179].row,t[179].col,t[179].tokenSpec);
      for (key in t) {
        // console.log(key, t[key], t[key].tokenSpec);
        if ((t[key].tokenSpec.charAt(0) == 'r') && (t[key].row < 101)) {
            t[key].tokenSpec = 'rback';
        }
      }
      res.json(t);
    });
  });

  // get all for red
  controller.get('/red', function(req, res, next) {
    boardModel.find(function(error,tokens) {
      if (error) return error;
      // send out a reversed board;
      var t = tokens;
      // replace red tokens with red backs
      console.log('get red ' + t[179].row,t[179].col,t[179].tokenSpec);
      for (key in t) {
        // console.log(key, t[key], t[key].tokenSpec);
        if ((t[key].tokenSpec.charAt(0) == 'b') && (t[key].row < 101)) {
            t[key].tokenSpec = 'bback';
        }
      }
      // console.log(t);
      res.json(t);
    });
  });

  // move Token
  controller.put('/move', function(req, res, next) {
    // pull out arguments
    console.log('req.body ' + req.body)
    var orgRow = req.body.orgRow;
    var orgCol = req.body.orgCol;
    var dstRow = req.body.dstRow;
    var dstCol = req.body.dstCol;
    var orgId;
    console.log('token.js ' + orgRow, orgCol, dstRow, dstCol);
    // what mode are we in
    playerModel.find(function(error,players) {
      if (error) return error;
      var isSetup = (players[0].turn=='setup');
      // if player is blue, board was rotated => transform
      // coordinatesbefore proceeding
      if (players[0].turn = 'blue') {
        if (orgRow <= 10) {
          orgRow = 11 - orgRow;
          orgCol = 11 - orgCol;
        };
        if (dstRow <= 10) {
          dstRow = 11 - dstRow;
          dstCol = 11 - dstCol;
        }
      };
      // res.json(players);
      console.log(players);

    // first get the id of the mover
      boardModel.find(
        { row: orgRow, col: orgCol },function(error, result) {
          if (error) return error;
          orgId = result[0]._id;
          orgSpec = result[0].tokenSpec;
          console.log('org ' + orgId, orgSpec);
          // res.json(result);
    // get the id of the prey
          boardModel.find({ row: dstRow, col: dstCol }, function(error, result) {
            if (error) return error;
            dstId = result[0]._id;
            dstSpec = result[0].tokenSpec;
            console.log('dst ' + dstId, dstSpec);
            if (isSetup) {
              console.log('line 397: ' + orgRow,orgCol,orgSpec,dstRow,dstCol,dstSpec);
              moveResult = checkSet.checkSet(orgRow,orgCol,orgSpec,dstRow,dstCol,dstSpec);
            } else {
              var moveResult = checkMove.checkMove(orgRow,orgCol,orgSpec,dstRow,dstCol,dstSpec);
            }
            switch(moveResult) {
              case 'move to empty space':
                // swap empty with mover
                console.log('here');
                boardModel.findByIdAndUpdate(dstId,
                  { 'tokenSpec': orgSpec }, function(error, result) {
                    if (error) return error;
                });
                boardModel.findByIdAndUpdate(orgId,
                  { 'tokenSpec': 'empty'}, function(error, result) {
                    if (error) return error;
                });
                break;
              case 'victory':
                // swap org and dst
                boardModel.findByIdAndUpdate(dstId,
                  { 'tokenSpec': orgSpec }, function(error, result) {
                    if (error) return error;
                    boardModel.findByIdAndUpdate(orgId,
                    { 'tokenSpec': 'empty'}, function(error, result) {
                      if (error) return error;
                    })
                  });
                // move loser to empty space in appropriate tray
                boardModel.findByIdAndUpdate(emptyTrayId(dstSpec.chatAt(0)),
                  { 'tokenSpec': dstSpec }, function(error, result) {
                    if (error) return error;
                  });
                  break;
              case 'win':
                // swap org and dst
                boardModel.findByIdAndUpdate(dstId,
                  { 'tokenSpec': orgSpec }, function(error, result) {
                    if (error) return error;
                });
                  boardModel.findByIdAndUpdate(orgId,
                  { 'tokenSpec': 'empty'}, function(error, result) {
                    if (error) return error;
                });
                // move loser to empty space in appropriate tray
                boardModel.findByIdAndUpdate(emptyTrayId(dstSpec.chatAt(0)),
                  { 'tokenSpec': dstSpec }, function(error, result) {
                    if (error) return error;
                  });
                  break;
              case 'defeat':
                // just place the mover in the tray
                boardModel.findByIdAndUpdate(orgId,
                  { 'tokenSpec': 'empty'}, function(error, result) {
                    if (error) return error;
                  });
                // move loser to empty space in appropriate tray
                boardModel.findByIdAndUpdate(emptyTrayId(orgSpec.chatAt(0)),
                  { 'tokenSpec': orgSpec }, function(error, result) {
                    if (error) return error;
                  });
                  break;
              case 'double defeat':
                // move org and dst to tray, replace with empties
                // mover first
                boardModel.findByIdAndUpdate(orgId,
                  { 'tokenSpec': 'empty'}, function(error, result) {
                    if (error) return error;
                  });
                boardModel.findByIdAndUpdate(emptyTrayId(orgSpec.chatAt(0)),
                  { 'tokenSpec': orgSpec }, function(error, result) {
                    if (error) return error;
                  });
                // prey next
                boardModel.findByIdAndUpdate(dstId,
                  { 'tokenSpec': 'empty'}, function(error, result) {
                    if (error) return error;
                  });
                boardModel.findByIdAndUpdate(emptyTrayId(dstSpec.chatAt(0)),
                  { 'tokenSpec': dstSpec }, function(error, result) {
                    if (error) return error;
                  });
                break;
              default:
              // move was not allowed. Just send a message.
              res.json({ 'message': moveResult });
            }
            console.log('488: ' + orgRow,orgCol,orgSpec,dstRow,dstCol,dstSpec,moveResult);
          });
      });
    });
  }); <!-- controller move token -->

  // get by Id
  controller.get('/:id', function(req, res, next) {
    boardModel.findById(req.params.id, function(error, token) {
      if (error) return error;
      res.json(token);
    });
  });

  // create
  controller.post('/', function(req, res, next) {
    boardModel.create(req.body, function(error, token) {
      // console.log(req.body);
      if (error) return error;
      res.json(token);
    });
  });

  // update by Id
  controller.put('/:id', function(req, res, next) {
    boardModel.findByIdAndUpdate(req.params.id, req.body, function(error, token) {
      if (error) return error;
      res.json(token);
    });
  });
  controller.patch('/:id', function(req, res, next) {
    boardModel.findByIdAndUpdate(req.params.id, req.body, function(error, token) {
      if (error) return error;
      res.json(token);
    });
  });

  // delete by Id
  controller.delete('/:id', function(req, res, next) {
    boardModel.findByIdAndRemove(req.params.id, req.body, function(error, token) {
      if (error) return error;
      res.json({
        "Message": "Token with the id of " + token.id + " has been removed"
      });
    });
  });

  module.exports = controller;
