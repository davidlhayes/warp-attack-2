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
                   'players.lastPreySurvived': false
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

module.exports = controller;
