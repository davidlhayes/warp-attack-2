  var express = require('express');
  var controller = express.Router();

  var boardModel = require('../models/Board');
  var bodyParser = require('body-parser');
  var transform = require('../logic/transform');

  // RESTful API

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
      var cell = { 'row' : 0, 'col' : 0, tokenId : 'none'};
      for (var i=1; i<19; i++) {
        for (var j=1; j<11; j++) {
          cell.row = i.toString();
          cell.col = j.toString();
          cell.tokenId = 'empty';
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

      boardModel.findOne({'tokenId':'r5'},function(error,tokens) {
        if (error) return error;
        boardModel.findByIdAndUpdate(tokens._id, { 'tokenId':'b4'}, function(error, token) {
          if (error) return error;
          });
        });

        boardModel.find(function(error,tokens) {
          if (error) return error;
          res.json(tokens);
        });

      // boardModel.findAndModify({query:{'tokenId':'r5'},update:{'tokenId':'r2'}},function(error,tokens) {
      //   if (error) return error;
      //   res.json(tokens._id);
      // });
  });

// set empty field and full trays
  controller.post('/trays', function(req, res, next) {

    var blues = [ 1,2,3,3,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,8,
                    9,9,9,9,9,9,9,9,'m','m','m','m','m','m','s','f' ];
    var reds = [ 1,2,3,3,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,8,
                    9,9,9,9,9,9,9,9,'m','m','m','m','m','m','s','f' ];
    var length;

    // check current object size
    boardModel.find(function(error,tokens) {
        if (error) return error;
    // if size is inadequate, clear the object and initialize an empty board
    if (tokens.length<180) {
      boardModel.collection.remove();
      var cell = { 'row' : 0, 'col' : 0, tokenId : 'none'};
      for (var i=1; i<19; i++) {
        for (var j=1; j<11; j++) {
          cell.row = i.toString();
          cell.col = j.toString();
          cell.tokenId = 'empty';
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
            boardModel.update({'row': i, 'col': j },{$set: {'tokenId': 'empty' }},function(error,tokens) {
              if (error) return error;
            });
          } else if (i<15) {
            cell = 'b' + blues.pop();
            boardModel.update({'row': i, 'col': j },{$set: {'tokenId': cell }},function(error,tokens) {
              if (error) return error;
            });
          } else {
            cell = 'r' + reds.pop();
            boardModel.update({'row': i, 'col': j },{$set: {'tokenId': cell }},function(error,tokens) {
              if (error) return error;
            });
          }
      }
      // set up the dmz
      // left center
      boardModel.update({'row': 4, 'col': 3 },{$set: {'tokenId': 'dmz' }},function(error,tokens) {
        if (error) return error;
      });
      boardModel.update({'row': 4, 'col': 4 },{$set: {'tokenId': 'dmz' }},function(error,tokens) {
        if (error) return error;
      });
      boardModel.update({'row': 5, 'col': 3 },{$set: {'tokenId': 'dmz' }},function(error,tokens) {
        if (error) return error;
      });
      boardModel.update({'row': 5, 'col': 4 },{$set: {'tokenId': 'dmz' }},function(error,tokens) {
        if (error) return error;
      });
      // right center
      boardModel.update({'row': 4, 'col': 7 },{$set: {'tokenId': 'dmz' }},function(error,tokens) {
        if (error) return error;
      });
      boardModel.update({'row': 4, 'col': 8 },{$set: {'tokenId': 'dmz' }},function(error,tokens) {
        if (error) return error;
      });
      boardModel.update({'row': 5, 'col': 7 },{$set: {'tokenId': 'dmz' }},function(error,tokens) {
        if (error) return error;
      });
      boardModel.update({'row': 5, 'col': 8 },{$set: {'tokenId': 'dmz' }},function(error,tokens) {
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
  controller.post('/bluetray', function(req, res, next) {
    // if anything was passed as an argument, this is a quick set
    if (req.body) {
      // useful sample arrangement
      var blues = [ 9 , 9 , 5 , 6 , 6 , 9 , 8 , 3 , 9 , 8 ,
                    4 , 7 , 2 ,'m', 4 ,'m', 5 , 5 ,'m', 4 ,
                   's','m', 8 , 7 , 3 ,'f', 1 ,'m', 8 , 6 ,
                    5 , 7 , 8 , 9 , 9 ,'m', 9 , 9 , 6 , 7];
    } else {
      var blues = [ 1,2,3,3,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,8,
                    9,9,9,9,9,9,9,9,'m','m','m','m','m','m','s','f' ];
    }

    // check current object size
    boardModel.find(function(error,tokens) {
      if (error) return error;
      // make sure the board size is adequate
      if (tokens.length=180) {
        // fill the blue staging area on the field with empty squares
        for (var i=1; i<=4; i++) {
          for (var j=1; j<=10; j++) {
            // if req body is non-null, this is a quick set
            if ("set" in req.body) {
              cell = 'b' + blues.pop();
            // it's a tray reset. empty the field
            } else {
              cell = 'empty';
            }
            boardModel.update({'row': i, 'col': j },{$set: {'tokenId': cell }},function(error,tokens) {
              if (error) return error;
            });
          }
        };
        // fill the blue tray with all the blue tokens
        for (var i=11; i<=14; i++) {
          for (var j=1; j<=10; j++) {
            // if req body is non-null, this is a quick set, so empty the tray
            if ("set" in req.body) {
              cell = 'empty';
            } else {
              cell = 'b' + blues.pop();
            }
            boardModel.update({'row': i, 'col': j },{$set: {'tokenId': cell }},function(error,tokens) {
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
  controller.post('/redtray', function(req, res, next) {
    // if anything was passed as an argument, this is a quick set
    if (req.body) {
      // useful sample arrangement
      var reds = [ 5 , 8 , 6 ,'m','f', 4 ,'m', 9 , 6 , 7 ,
                  'm', 7 , 3 , 5 , 9 , 1 ,'m', 9 , 9 , 4 ,
                   5 , 3 ,'s', 6 , 2 , 8 , 7 , 8 , 5 ,'m',
                   9 ,'m', 8 , 7 , 9 , 4 , 9 , 8 , 6 , 9];
    } else {
      var reds = [ 1,2,3,3,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,8,
                    9,9,9,9,9,9,9,9,'m','m','m','m','m','m','s','f' ];
    }

    // check current object size
    boardModel.find(function(error,tokens) {
        if (error) return error;
      // make sure the board size is adequate
      if (tokens.length=180) {
        // fill the red staging area on the field with empty squares
        for (var i=7; i<=10; i++) {
          for (var j=1; j<=10; j++) {
            // if req.body is non-null, this is a quick set. Fill the field
            if ("set" in req.body) {
              cell = 'r' + reds.pop();
            } else {
              cell = 'empty';
            }
            boardModel.update({'row': i, 'col': j },{$set: {'tokenId': cell }},function(error,tokens) {
              if (error) return error;
            });
          }
        }
        // fill the red tray with all the red tokens
        for (var i=15; i<=18; i++) {
          for (var j=1; j<=10; j++) {
            // if req.body is non-null, this is a quick set. Empty the tray
            if ("set" in req.body) {
              cell = 'empty';
            } else {
              cell = 'r' + reds.pop();
            }
            boardModel.update({'row': i, 'col': j },{$set: {'tokenId': cell }},function(error,tokens) {
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

  // get all for red
  controller.get('/red', function(req, res, next) {
    boardModel.find(function(error,tokens) {
      if (error) return error;
      // console.log(tokens[4].row,tokens[4].col,tokens[4].tokenId);
      transform.transformRed(tokens);
      res.json(tokens);
    });
  });

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
      console.log(req.body);
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
