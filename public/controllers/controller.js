/**
 * Angular main application
 */
var myApp = angular.module('myApp', []);



/**
 * myApp controller
 */
myApp.controller('AppController', ['$scope', '$http', function ($scope, $http) {
    // console.log("Hello World from controller");

    /**
     * Retrieve the contacts againx
     */
    var refresh = function () {
        $http.get('/contactlist').success(function (response) {
            console.log("I got the data I requested");
            $scope.contactlist = response;
            $scope.contact = "";
        });
    };
    refresh();

    /**
     * Add contact to database
     */
    $scope.addUser = function () {
        // console.log($scope.user);
        $http.post('/signup', $scope.users).success(function (response) {
            console.log(response);
            
            //refresh();
        });
    };
    $scope.login = function () {
        // console.log($scope.user);
        $http.post('/login', $scope.users).success(function (response) {
            
            console.log(response);
            
            $scope.users = response;
            localStorage.setItem("username" , response.username);
            window.location.href = "/contact.html";
            //myApp.router.navigate(['/contact']);
            //refresh();
            
        });
    };
    $scope.addContact = function () {
        // console.log($scope.contact);
        $http.post('/contactlist', $scope.contact).success(function (response) {
            
            $scope.clear();
            refresh();
        });
    };

    /**
     * Delete a contact
     * @param id
     */
    $scope.remove = function (id) {
        // console.log(id);
        $http.delete('/contactlist/' + id).success(function (response) {
            refresh();
        });
    };

    /**
     * Edit a contact
     * @param id
     */
    $scope.edit = function (id) {
        // console.log(id);
        $http.get('/contactlist/' + id).success(function (response) {
            $scope.contact = response;
        });
    };

    /**
     * Update a contact information
     */
    $scope.update = function () {
        // console.log($scope.contact._id);
        $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function (response) {
            refresh();
        })
    };

    /**
     * Clear the inputs for contact
     */
    $scope.clear = function () {
        $scope.contact = "";
    }
}]);