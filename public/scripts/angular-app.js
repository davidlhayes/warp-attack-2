var app = angular.module('warp', ['ngRoute']);

app.controller('BoardCtrl', ['$scope', '$route', '$http', function($scope, $route, $http) {
  $http.get('/tokens').success(function(data) {
    console.log('fetched data');
    for (key in data) {
      console.log(data[key].row, data[key].col, data[key].tokenId);
    }

  $scope.spaces = data;

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
  $scope.tellMe = function(col, row, tokenId) {
    console.log(col, row, tokenId);
  };

});

}]);


// var tokens = [
//   {
//     row: 1,
//     col: 1,
//     tokenId: 'r1'
//   },
//   {
//     row: 2,
//     col: 1,
//     tokenId: 'r2'
//   },
//   {
//     row: 3,
//     col: 1,
//     tokenId: 'r3'
//   },
//   {
//     row: 1,
//     col: 2,
//     tokenId: 'r4'
//   },
//   {
//     row: 2,
//     col: 2,
//     tokenId: 'r5'
//   },
//   {
//     row: 3,
//     col: 2,
//     tokenId: 'b1'
//   },
//   {
//     row: 1,
//     col: 3,
//     tokenId: 'b2'
//   },
//   {
//     row: 2,
//     col: 3,
//     tokenId: 'b3'
//   },
//   {
//     row: 3,
//     col: 3,
//     tokenId: 'b4'
//   },
//   {
//     row: 1,
//     col: 4,
//     tokenId: 'b5'
//   },
//   {
//     row: 2,
//     col: 4,
//     tokenId: 'b6'
//   },
//   {
//     row: 3,
//     col: 4,
//     tokenId: 'b7'
//   },
//   {
//     row: 1,
//     col: 5,
//     tokenId: 'r2'
//   },
//   {
//     row: 2,
//     col: 5,
//     tokenId: 'r3'
//   },
//   {
//     row: 3,
//     col: 5,
//     tokenId: 'b1'
//   },
//   {
//     row: 1,
//     col: 6,
//     tokenId: 'b2'
//   },
//   {
//     row: 2,
//     col: 6,
//     tokenId: 'b3'
//   },
//   {
//     row: 3,
//     col: 6,
//     tokenId: 'r4'
//   },
//   {
//     row: 1,
//     col: 7,
//     tokenId: 'b4'
//   },
//   {
//     row: 2,
//     col: 7,
//     tokenId: 'b9'
//   },
//   {
//     row: 3,
//     col: 7,
//     tokenId: 'b9'
//   },
//   {
//     row: 1,
//     col: 8,
//     tokenId: 'r1'
//   },
//   {
//     row: 2,
//     col: 8,
//     tokenId: 'r2'
//   },
//   {
//     row: 3,
//     col: 8,
//     tokenId: 'r3'
//   },
//   {
//     row: 1,
//     col: 9,
//     tokenId: 'b1'
//   },
//   {
//     row: 2,
//     col: 9,
//     tokenId: 'b2'
//   },
//   {
//     row: 3,
//     col: 9,
//     tokenId: 'b3'
//   },
//   {
//     row: 1,
//     col: 10,
//     tokenId: 'r4'
//   },
//   {
//     row: 2,
//     col: 10,
//     tokenId: 'b4'
//   },
//   {
//     row: 3,
//     col: 10,
//     tokenId: 'b9'
//   }
// ];
// // for (var key in tokens) {
// // console.log(key, tokens[key]);
// // }
// console.log(tokens);
