  var teamColor = 'blue';
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
    .factory('statusService', function() {
      var turn = 'red';
      return {
        getTurn: function(){
          return turn;
        }
      };
    })
    .controller('BoardCtrl', ['$scope','$http','$rootScope','tokenFactory',
               'statusService', function($scope,$http,$rootScope,tokenFactory, statusService) {
      $scope.myColor = teamColor;

      setInterval(function(){
        showBoard();
        console.log('BoardCtrl: ' + statusService.getTurn() );
      }, 2000);
      console.log($scope.myColor);
      showBoard();
      function showBoard() {
        if ($scope.myColor == 'blue') {
        tokenFactory.getBlueTokens()
          .success(function(tokens) {
            $scope.leftTray = tokens.slice(100,140);
            $scope.board = tokens.slice(0,100);
            $scope.rightTray = tokens.slice(140,180);
            // console.log(tokens);
          }).error(function(error) {
            $scope.status = 'Unable to load token data: ' + error.message;
          });
        } else {
          tokenFactory.getTokens()
            .success(function(tokens) {
              $scope.leftTray = tokens.slice(100,140);
              $scope.board = tokens.slice(0,100);
              $scope.rightTray = tokens.slice(140,180);
              // console.log(tokens);
            }).error(function(error) {
              $scope.status = 'Unable to load token data: ' + error.message;
            });
        }
      }

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
    .controller('PlayerCtrl', ['$scope', '$route', '$http', 'statusService',
                                                function($scope, $route, $http) {


      $scope.showTurnStatus = function() {
        $http.get('/players/turn').success(function(data) {
          $scope.turn = data.turn;
        });
      };

      $scope.showMoveStatus = function() {
        $http.get('/players/movement').success(function(data) {
          $scope.movement = data.movement;
        });
      };


  }]);
