/**
 * Angular main application
 */
var myApp = angular.module('myApp', []);

/**
 * Users controller
 */
myApp.controller('AppController', ['$scope', '$http', function ($scope, $http) {
    // console.log("Hello World from controller");

    /**
     * Retrieve the user againx
     */

        $http.get('/signup').success(function (req, res) {
            console.log("I got the data I requested");
            userService.create(req.body)
                .then(function () {
                    res.sendStatus(200);
                })
                .catch(function (err) {
                    res.status(400).send(err);
                });
        });


    /**
     * Add user to database
     */
    $scope.addUser = function () {
        // console.log($scope.user);
        $http.post('/signup', $scope.user).success(function (response) {
            console.log(response);
            refresh();
        });
    };
    $scope.login = function () {
        // console.log($scope.user);
        $http.post('/login', $scope.user).success(function (response) {
            console.log(response);
        });
    };
}]);