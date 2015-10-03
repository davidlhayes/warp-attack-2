var teamColor = 'blue';

var app = angular.module('warp', ['ngRoute']);

app.controller('BoardCtrl', ['$scope', '$route', '$http', function($scope, $route, $http) {
  var colorUrl = '/tokens';
  $scope.myColor = teamColor;
  $http.get(colorUrl).success(function(data) {
    console.log('fetched data');
    console.log(data.length);
    // for (key in data) {
    //   console.log(data[key].row, data[key].col, data[key].tokenSpec);
    // };
    $scope.board = data.slice(0,100);
    $scope.leftTray = data.slice(100,140);
    $scope.rightTray = data.slice(140,180);

    //       console.log($scope.board);
    // for (key in $scope.leftTray) {
    //   console.log($scope.leftTray[key].row, $scope.leftTray[key].col, $scope.leftTray[key].tokenSpec);
    // };

  $scope.sortCol = 'col';
  $scope.sortRow = 'row';
  $scope.switchIt = function(fsw) {
    if (fsw) {
      $scope.sortCol = '-col';
      $scope.sortRow = '-row';
    } else {
      $scope.sortCol = '-col';
      $scope.sortRow = '-row';
    };
    $route.reload();
  };
  $scope.tellMe = function() {
    console.log('HI');
  };
  $scope.switchSides = function() {
    console.log($scope.myColor);
    if ($scope.myColor == 'red') {
      $scope.myColor = 'blue';
      // $route.reload();
    } else if ($scope.myColor == 'blue') {
      $scope.myColor = 'red';
      // $route.reload();
    };
  }

});

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
