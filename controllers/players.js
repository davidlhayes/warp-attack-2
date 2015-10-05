  var express = require('express');
  var controller = express.Router();

  var playerModel = require('../models/Player');
  var bodyParser = require('body-parser');

  // boardDelete
  controller.post('/', function(req, res, next) {
    console.log('success on players');
    var status = { 'red' : false,
                   'blue': false,
                   'turn': 'setup',
                   'lastOrg': { row: 1, col: 2},
                   'lastDst': { row: 1, col: 2},
                   'lastMover': 'none',
                   'lastPrey': 'none',
                   'lastMoverSurvived': false,
                   'lastPreySurvived': false
                 }
    playerModel.create(status, function(error, players) {
      if (error) return error;
    });
  });

  controller.get('/', function(req, res, next) {
    playerModel.find(function(error,players) {
      if (error) return error;
      res.json(players);
    });
  });

  controller.get('/turn', function(req, res, next) {
    playerModel.find(function(error,players) {
      if (error) return error;
      var turn = { turn : players[0].turn };
      res.json(turn);;
    });
  });

  controller.get('/movement', function(req, res, next) {
    playerModel.find(function(error,players) {
      if (error) return error;
      var movement = { movement : 'Last movement: '
       + players[0].lastOrg.row + ':' + players[0].lastOrg.col
       + ' to '
       + players[0].lastDst.row + ':' + players[0].lastDst.col };
      res.json(movement);
    });
  });

module.exports = controller;
