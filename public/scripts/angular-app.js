  var teamColor = 'blue';
  var heartBeat = 0;
  var mickey = {};

  var app = angular.module('warpApp', ['ngRoute', 'ngResource']);
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
    .controller('BoardCtrl', ['$scope','$http','$rootScope','tokenFactory', function($scope,$http,$rootScope,tokenFactory) {
      $scope.myColor = teamColor;

      setInterval(function(){ showBoard();}, 2000);
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



  //   $scope.$watch("myColor", function(newValue, oldValue) {
  //     if(newValue != oldValue ) {
  //       getColors();
  //     }
  //   });
  //
  //   $scope.$watch("myHeartBeat", function(newValue, oldValue) {
  //     // console.log('heartbeat' + $scope.myHeartBeat);
  //     if(newValue != oldValue ) {
  //       getColors();
  //     }
  //   });
  //
  //   function getColors() {
  //     var colorUrl = '/tokens/' + $scope.myColor;
  //     $http.get(colorUrl).success(function(data) {
  //       console.log('fetched data');
  //       // console.log(data.length);
  //       // for (key in data) {
  //         console.log(data[179].row, data[179].col, data[179].tokenSpec);
  //       // };
  //       $scope.board = data.slice(0,100);
  //       $scope.leftTray = data.slice(100,140);
  //       $scope.rightTray = data.slice(140,180);
  //
  //       //       console.log($scope.board);
  //       // for (key in $scope.leftTray) {
  //       //   console.log($scope.leftTray[key].row, $scope.leftTray[key].col, $scope.leftTray[key].tokenSpec);
  //       // };
  //     });
  //   };
  //
  //
  //   $scope.sortCol = 'col';
  //   $scope.sortRow = 'row';
  //   $scope.switchIt = function(fsw) {
  //     if (fsw) {
  //       $scope.sortCol = '-col';
  //       $scope.sortRow = '-row';
  //     } else {
  //       $scope.sortCol = '-col';
  //       $scope.sortRow = '-row';
  //     };
  //     $route.reload();
  //   };
  //   $scope.tellMe = function() {
  //     // console.log('HI');
  //   };
  //
  //   $scope.switchSides = function() {
  //     // console.log($scope.myColor);
  //     if ($scope.myColor == 'red') {
  //       $scope.myColor = 'blue';
  //       // getColors($scope.myColor);
  //       // console.log('turning blue');
  //       // $route.reload();
  //     } else if ($scope.myColor == 'blue') {
  //       $scope.myColor = 'red';
  //       // getColors($scope.myColor);
  //       // console.log('turning red');
  //       // $route.reload();
  //     };
  //   }
  //
  //   // set tokens in trays
  //   $scope.setTrays = function() {
  //     $http.put('/tokens/trays').success(function(data) {
  //       // console.log('set trays');
  //     });
  //     $scope.myHeartBeat++;
  //   };
  //
  //   // set blue tokens in tray
  //   $scope.setBlueTray = function() {
  //     $http({
  //       method: 'PUT',
  //       url: '/tokens/bluetray',
  //       headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  //     });
  //     $scope.myHeartBeat++;
  //   };
  //
  //   // set blue tokens on field
  //   $scope.setBlueField = function() {
  //     $http({
  //       method: 'PUT',
  //       url: '/tokens/bluetray',
  //       data: message = "set",
  //       headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  //     });
  //     $scope.myHeartBeat++;
  //   };
  //
  //   // set red tokens in tray
  //   $scope.setRedTray = function() {
  //     $http({
  //       method: 'PUT',
  //       url: '/tokens/redtray',
  //       headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  //     });
  //     $scope.myHeartBeat++;
  //   };
  //
  //   // set red tokens on field
  //   $scope.setRedField = function() {
  //     $http({
  //       method: 'PUT',
  //       url: '/tokens/redtray',
  //       data: message = "set",
  //       headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  //     });
  //     $scope.myHeartBeat++;
  //   };
  //
  //   // move token
  //   $scope.moveToken = function() {
  //     $http({
  //       method: 'PUT',
  //       url: '/tokens/move',
  //       data: $.param({
  //               orgRow: $scope.orgRow,
  //               orgCol: $scope.orgCol,
  //               dstRow: $scope.dstRow,
  //               dstCol: $scope.dstCol}),
  //       headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  //     });
  //   }
  //
  // }]);
  //
  app.controller('PlayerCtrl', ['$scope', '$route', '$http', function($scope, $route, $http) {

    function getPlayerStatus() {
      $http.get('/players').success(function(data) {
        // console.log('fetched players');
        // console.log(data.length);
        // console.log(data[0].turn);
        $scope.status = data[0].turn;

      });
    };
    $scope.incrTimer = function () {
      getPlayerStatus();
    };

    //
    // $scope.$watch("myHeartBeat", function(newValue, oldValue) {
    //   console.log('heartbeat' + $scope.myHeartBeat);
    //   if(newValue != oldValue ) {
    //     getPlayerStatus();
    //   }
    // });
    //
    // $scope.incrTimer() {
    //   $scope.myHeartBeat++;
    // }

  }]);

  // var tokens = [
  //   {
  //     row: 1,
  //     col: 1,
  //     tokenSpec: 'r1'
  //   },
  //   {
  //     row: 2,
  //     col: 1,
  //     tokenSpec: 'r2'
  //   },
  //   {
  //     row: 3,
  //     col: 1,
  //     tokenSpec: 'r3'
  //   },
  //   {
  //     row: 1,
  //     col: 2,
  //     tokenSpec: 'r4'
  //   },
  //   {
  //     row: 2,
  //     col: 2,
  //     tokenSpec: 'r5'
  //   },
  //   {
  //     row: 3,
  //     col: 2,
  //     tokenSpec: 'b1'
  //   },
  //   {
  //     row: 1,
  //     col: 3,
  //     tokenSpec: 'b2'
  //   },
  //   {
  //     row: 2,
  //     col: 3,
  //     tokenSpec: 'b3'
  //   },
  //   {
  //     row: 3,
  //     col: 3,
  //     tokenSpec: 'b4'
  //   },
  //   {
  //     row: 1,
  //     col: 4,
  //     tokenSpec: 'b5'
  //   },
  //   {
  //     row: 2,
  //     col: 4,
  //     tokenSpec: 'b6'
  //   },
  //   {
  //     row: 3,
  //     col: 4,
  //     tokenSpec: 'b7'
  //   },
  //   {
  //     row: 1,
  //     col: 5,
  //     tokenSpec: 'r2'
  //   },
  //   {
  //     row: 2,
  //     col: 5,
  //     tokenSpec: 'r3'
  //   },
  //   {
  //     row: 3,
  //     col: 5,
  //     tokenSpec: 'b1'
  //   },
  //   {
  //     row: 1,
  //     col: 6,
  //     tokenSpec: 'b2'
  //   },
  //   {
  //     row: 2,
  //     col: 6,
  //     tokenSpec: 'b3'
  //   },
  //   {
  //     row: 3,
  //     col: 6,
  //     tokenSpec: 'r4'
  //   },
  //   {
  //     row: 1,
  //     col: 7,
  //     tokenSpec: 'b4'
  //   },
  //   {
  //     row: 2,
  //     col: 7,
  //     tokenSpec: 'b9'
  //   },
  //   {
  //     row: 3,
  //     col: 7,
  //     tokenSpec: 'b9'
  //   },
  //   {
  //     row: 1,
  //     col: 8,
  //     tokenSpec: 'r1'
  //   },
  //   {
  //     row: 2,
  //     col: 8,
  //     tokenSpec: 'r2'
  //   },
  //   {
  //     row: 3,
  //     col: 8,
  //     tokenSpec: 'r3'
  //   },
  //   {
  //     row: 1,
  //     col: 9,
  //     tokenSpec: 'b1'
  //   },
  //   {
  //     row: 2,
  //     col: 9,
  //     tokenSpec: 'b2'
  //   },
  //   {
  //     row: 3,
  //     col: 9,
  //     tokenSpec: 'b3'
  //   },
  //   {
  //     row: 1,
  //     col: 10,
  //     tokenSpec: 'r4'
  //   },
  //   {
  //     row: 2,
  //     col: 10,
  //     tokenSpec: 'b4'
  //   },
  //   {
  //     row: 3,
  //     col: 10,
  //     tokenSpec: 'b9'
  //   }
  // ];
  // // for (var key in tokens) {
  // // console.log(key, tokens[key]);
  // // }
  // console.log(tokens);
