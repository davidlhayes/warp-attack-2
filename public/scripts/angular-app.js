  var teamColor = '';
  var loggedIn = false;
  var heartBeat = 0;
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
      var playerTurnUrl = '/players/turn';

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

      tokenFactory.setTrays = function() {
        var data = $http.put(tokenSetTraysUrl);
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
        console.log('data ' + data);
      }

      return tokenFactory;
  }]);

  angular.module('warpApp')
    .controller('BoardCtrl', ['$scope','$http','$rootScope','tokenFactory',
               'statusService', function($scope,$http,$rootScope,tokenFactory, statusService) {

      $scope.colSortOrder = 'col';
      $scope.rowSortOrder = 'row';
      var activecell = { row: 0, col: 0}

      $scope.getTurn = function() {
        var data = $http.get('/players/turn').then(function(res) {
        $scope.turn = res.data.turn;
        return res.data.turn;
      })
    };

      setInterval(function(){
        showBoard();
        $scope.getTurn();
        $scope.loggedIn = ((teamColor=='red') || (teamColor=='blue'));
        $scope.myColor = teamColor;
        // console.log('BoardCtrl logged in: ' + loggedIn );
      }, 10000);

      console.log('team color ' + teamColor);
      showBoard();
      $scope.loggedIn = loggedIn;

      function showBoard() {
        // console.log('showBoard ' + teamColor);
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

        if (teamColor=='blue') {
          if (oRow < 11) {
            var oRow = 11-$scope.orgRow;
            var oCol = 11-$scope.orgCol;
          }
          if (drow < 11) {
            var dRow = 11-$scope.dstRow;
            var dCol = 11-$scope.dstCol;
          }
        } else {
          var oRow = $scope.orgRow;
          var oCol = $scope.orgCol;
          var dRow = $scope.dstRow;
          var dCol = $scope.dstDst;
        }
          var data = $.param({
                  orgRow: oRow,
                  orgCol: oCol,
                  dstRow: dRow,
                  dstCol: dCol})
          tokenFactory.moveToken(data).success(function() {
            // console.log('sucessful move');
            // showBoard();
          }).error(function(error) {
            // console.log('error: ' + error.message);
        })
      }

      $scope.setRedTray = function() {
        tokenFactory.setRedTray();
      }

      $scope.setBlueTray = function() {
        tokenFactory.setBlueTray();
      }

      $scope.setRedField = function() {
        tokenFactory.setRedField();
      }

      $scope.setBlueField = function() {
        tokenFactory.setBlueField();
      }

      $scope.setTrays = function() {
        tokenFactory.setTrays();
      }

      $scope.isActive = function(cell) {
        if ((cell.row==activecell.row)
         &&((cell.col==activecell.col)))
         {
          return true;
        }
      }
      $scope.activate = function(cell) {
        console.log('I AM HERE');
        if ((activecell.row != 0) && (activecell.col !=0)) {
          console.log($scope.orgRow, $scope.orgCol);
          if (teamColor=='blue') {
            if (oRow < 11) {
              var oRow = 11-$scope.orgRow;
              var oCol = 11-$scope.orgCol;
            }
            if (drow < 11) {
              var dRow = 11-$scope.dstRow;
              var dCol = 11-$scope.dstCol;
            }
          } else {
            var oRow = $scope.orgRow;
            var oCol = $scope.orgCol;
            var dRow = $scope.dstRow;
            var dCol = $scope.dstDst;
          }
          console.log($scope.orgRow, $scope.orgCol);
            var data = $.param({
                    orgRow: activecell.row,
                    orgCol: activecell.col,
                    dstRow: cell.row,
                    dstCol: cell.col})
            tokenFactory.moveToken(data).success(function(){
              console.log('hey');
            });
              // console.log('error: ' + error.message);
              activecell.row = 0;
              activecell.col = 0;
        } else {
          console.log(cell.row, cell.col);
          activecell.row = cell.row;
          activecell.col = cell.col;
        }
      }

  }]);

  angular.module('warpApp')
    .factory('statusService', [ '$http', '$q', function($http, $q) {
      return {
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
        }
    }])
    .controller('PlayerCtrl', ['$scope', '$route', '$http', 'statusService', 'tokenFactory', '$timeout',
                                  function($scope, $route, $http, statusService,tokenFactory, $timeout) {

      $scope.getTurn = function() {
          var data = $http.get('/players/turn').then(function(res) {
          $scope.turn = res.data.turn;
          console.log('getTurn');
          console.log($scope.turn);
          return res.data.turn;
        })
      };

      setInterval(function(){
        $scope.turn = $scope.getTurn();
        console.log('setInterval');
        console.log($scope.turn);
        $scope.loggedIn = ((teamColor=='red') || (teamColor=='blue'));

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
