  var teamColor = '';
  var loggedIn = false;
  var heartBeat = 0;
  var mickey = {};
  var Turn;
  // delcare app
  var app = angular.module('warpApp', ['ngRoute', 'ngResource']);

  // make a factory to render board views/functions
  angular.module('warpApp')
    .factory('tokenFactory', ['$http', function($http) {
      var tokenUrl = '/tokens/';
      var tokenRedUrl = '/tokens/red';
      var tokenBlueUrl ='/tokens/blue';
      var tokenSetTraysUrl = '/tokens/trays';
      var tokenSetRedTrayUrl = '/tokens/redtray';
      var tokenSetRedFieldUrl = '/tokens/redfield';
      var tokenSetBlueTrayUrl = '/tokens/bluetray';
      var tokenSetBlueFieldUrl = '/tokens/bluefield';
      var tokenMoveTokenUrl = '/tokens/move';

      var tokenFactory = { };

      tokenFactory.getTokens = function() {
        var data = $http.get(tokenUrl);
        return data;
      };

      tokenFactory.getRedTokens = function() {
        var data = $http.get(tokenRedUrl);
        console.log('getRedTokens');
        return data;
      }

      tokenFactory.getBlueTokens = function() {
        var data = $http.get(tokenBlueUrl);
        return data;
      }

      tokenFactory.setRedTray = function() {
        var data = $http.put(tokenSetRedTrayUrl);
        return data;
      }

      tokenFactory.setRedField = function() {
        var data = $http.put(tokenSetRedFieldUrl);
        return data;
      }

      tokenFactory.setBlueTray = function() {
        var data = $http.put(tokenSetBlueTrayUrl);
        return data;
      }

      tokenFactory.setBlueField = function() {
        var data = $http.put(tokenSetBlueFieldUrl);
        return data;
      }

      tokenFactory.moveToken = function(move) {
        console.log(move);
        var data = $http({
          method: 'PUT',
          url: tokenMoveTokenUrl,
          data: move,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          });
        return data;
      }

      return tokenFactory;
  }]);

  angular.module('warpApp')
    .controller('BoardCtrl', ['$scope','$http','$rootScope','tokenFactory',
               'statusService', function($scope,$http,$rootScope,tokenFactory, statusService) {

      setInterval(function(){
        showBoard();
        $scope.turn = statusService.getTurn();
        $scope.loggedIn = ((teamColor=='red') || (teamColor=='blue'));
        // console.log('BoardCtrl logged in: ' + loggedIn );
      }, 2000);

      console.log('team color ' + teamColor);
      showBoard();
      $scope.loggedIn = loggedIn;

      function showBoard() {
        console.log('showBoard ' + teamColor);
        if (teamColor == 'blue') {
        tokenFactory.getBlueTokens()
          .success(function(tokens) {
            $scope.leftTray = tokens.slice(100,140);
            $scope.board = tokens.slice(0,100);
            $scope.rightTray = tokens.slice(140,180);
            // console.log(tokens);
          }).error(function(error) {
            $scope.status = 'Unable to load token data: ' + error;
          });
        } else {
          tokenFactory.getRedTokens()
            .success(function(tokens) {
              $scope.leftTray = tokens.slice(100,140);
              $scope.board = tokens.slice(0,100);
              $scope.rightTray = tokens.slice(140,180);
              // console.log(tokens);
            }).error(function(error) {
              $scope.status = 'Unable to load token data: ' + error;
            });
        }
      };

      $scope.moveToken = function() {
        console.log('welcome to moveToken');
          var data = $.param({
                  orgRow: $scope.orgRow,
                  orgCol: $scope.orgCol,
                  dstRow: $scope.dstRow,
                  dstCol: $scope.dstCol})
          tokenFactory.moveToken(data).success(function() {
            // console.log('sucessful move');
            // showBoard();
          }).error(function(error) {
            // console.log('error: ' + error.message);
        })
      }
  }]);

  angular.module('warpApp')
    .factory('statusService', [ '$http', '$q', function($http, $q) {
      return {
        getTurn: function(){
          var turn = 'setup';
          $http.get('/players/turn').success(function(data) {
            turn = data.turn;
          });
          return turn;
        },
        getMovement: function(){
          $http.get('/players/movement').success(function(data) {
            if (error) return error;
            lastMovement = data.movement;
          });
          return lastMovement;
        },
        getRedPresence: function(){
          var redPresent = false;
          var defered = $q.defer();
          $http.get('/players/redpresent').then(function(resp) {
            redPresent = resp.data;
            defered.resolve(redPresent);
            // return redPresent;
          }, function(error) {
            return defered.reject();
          });
          return defered.promise;
        },
        getBluePresence: function(){
          var bluePresent = false;
          var defered = $q.defer();
          $http.get('/players/bluepresent').then(function(resp) {
            bluePresent = resp.data;
            defered.resolve(bluePresent);
          }, function(error) {
            return defered.reject();
          });
          return defered.promise;
        },
        setRedPresence: function() {
          $http.put('/players/setredpresence').success(function() {
          });
        },
        setBluePresence: function() {
          $http.put('/players/setbluepresence').success(function() {
          });
        },
        endRedPresence: function() {
          $http.put('/players/endredpresence').success(function() {
          });
        },
        endBluePresence: function() {
          $http.put('/players/endbluepresence').success(function() {
          });
        }
      };
    }])
    .controller('PlayerCtrl', ['$scope', '$route', '$http', 'statusService', 'tokenFactory', '$timeout',
                                  function($scope, $route, $http, statusService,tokenFactory, $timeout) {

      setInterval(function(){
        $scope.turn = statusService.getTurn();
        $scope.loggedIn = ((teamColor=='red') || (teamColor=='blue'));
        // console.log('PlayerCtrl logged in: ' + $scope.loggedIn );
      }, 10000);

      statusService.getRedPresence().then(function(resp) {
        console.log(resp.redpresent, 'red');
        $scope.redpresent = resp.redpresent;
      }, function(error) {
        console.log(error);
      })
      var x = {};
      function xs(args) {
        $timeout(function() {
          console.log(args);
        })

      }

      statusService.getBluePresence().then(function(resp) {
        x = resp.bluepresent
        xs(x);
        console.log(resp.bluepresent, 'blue');
        $scope.bluepresent = resp.bluepresent;
      }, function(error) {
        console.log(error);
      })

      // $scope.redpresent = true;
      // $scope.loggedIn = true;

      $scope.showTurnStatus = function() {
        $scope.turn = statusService.getTurn();
      };

      $scope.showMoveStatus = function() {
        $scope.movement = statusService.getMovement();
      };

      function showRedPresence() {
        console.log('showRedPresence');
        console.log(statusService.getRedPresence());
      };

      function showBluePresence() {
        console.log('showBluePresence');
        $scope.bluepresent = statusService.getBluePresence();
      };

      $scope.chooseRed = function() {
        teamColor = 'red';
        statusService.setRedPresence();
      };

      $scope.chooseBlue = function() {
        teamColor = 'blue';
        statusService.setBluePresence();
      };

      $scope.logOutRed = function() {
        statusService.endRedPresence();
        statusService.getRedPresence().then(function(resp) {
          console.log(resp.redpresent, 'red');
          $scope.redpresent = resp.redpresent;
        }, function(error) {
          console.log(error);
        })
      };

      $scope.logOutBlue = function() {
        statusService.endBluePresence();
        statusService.getBluePresence().then(function(resp) {
          x = resp.bluepresent
          xs(x);
          console.log(resp.bluepresent, 'blue');
          $scope.bluepresent = resp.bluepresent;
        }, function(error) {
          console.log(error);
        })
      };

  }]);
