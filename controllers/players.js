  var express = require('express');
  var controller = express.Router();

  var playerModel = require('../models/Player');
  var bodyParser = require('body-parser');

  // boardDelete
  controller.get('/', function(req, res, next) {
    playerModel.find(function(error,players) {
      if (error) return error;
      res.json(players);
    });
    if (players.length < 9) {
      players.red = false;
      players.blue = false;
      players.turn = 'setup';
      players.lastOrg = { row: 1, col: 1 };
      players.lastDst = { row: 1, col: 2 };
      players.lastMover = 'none';
      players.lastPrey = 'none';
      players.lastMoverSurvived = false;
      players.lastPreySurvived = false;
      res.json(players);
    }
  });

module.exports = controller;
