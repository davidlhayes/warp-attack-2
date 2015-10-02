var app = angular.module('warp', ['ngRoute']);

app.controller('BoardCtrl', ['$scope', '$route', '$http', function($scope, $route, $http) {
  $http.get('/tokens').success(function(data) {
    console.log('fetched data');
    console.log(data);
  })
  $scope.spaces = tokens;
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
  $scope.tellMe = function(col, row, id) {
    console.log(col, row, id);
  };

}]);


var tokens = [
  {
    row: 1,
    col: 1,
    id: 'r1'
  },
  {
    row: 2,
    col: 1,
    id: 'r2'
  },
  {
    row: 3,
    col: 1,
    id: 'r3'
  },
  {
    row: 1,
    col: 2,
    id: 'r4'
  },
  {
    row: 2,
    col: 2,
    id: 'r5'
  },
  {
    row: 3,
    col: 2,
    id: 'b1'
  },
  {
    row: 1,
    col: 3,
    id: 'b2'
  },
  {
    row: 2,
    col: 3,
    id: 'b3'
  },
  {
    row: 3,
    col: 3,
    id: 'b4'
  },
  {
    row: 1,
    col: 4,
    id: 'b5'
  },
  {
    row: 2,
    col: 4,
    id: 'b6'
  },
  {
    row: 3,
    col: 4,
    id: 'b7'
  },
  {
    row: 1,
    col: 5,
    id: 'r2'
  },
  {
    row: 2,
    col: 5,
    id: 'r3'
  },
  {
    row: 3,
    col: 5,
    id: 'b1'
  },
  {
    row: 1,
    col: 6,
    id: 'b2'
  },
  {
    row: 2,
    col: 6,
    id: 'b3'
  },
  {
    row: 3,
    col: 6,
    id: 'r4'
  },
  {
    row: 1,
    col: 7,
    id: 'b4'
  },
  {
    row: 2,
    col: 7,
    id: 'b9'
  },
  {
    row: 3,
    col: 7,
    id: 'b9'
  },
  {
    row: 1,
    col: 8,
    id: 'r1'
  },
  {
    row: 2,
    col: 8,
    id: 'r2'
  },
  {
    row: 3,
    col: 8,
    id: 'r3'
  },
  {
    row: 1,
    col: 9,
    id: 'b1'
  },
  {
    row: 2,
    col: 9,
    id: 'b2'
  },
  {
    row: 3,
    col: 9,
    id: 'b3'
  },
  {
    row: 1,
    col: 10,
    id: 'r4'
  },
  {
    row: 2,
    col: 10,
    id: 'b4'
  },
  {
    row: 3,
    col: 10,
    id: 'b9'
  }
];
// for (var key in tokens) {
// console.log(key, tokens[key]);
// }
