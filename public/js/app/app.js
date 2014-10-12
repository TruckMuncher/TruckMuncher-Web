var app = angular.module('TruckMuncherApp', ['ui.router', 'localytics.directives']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("home");

    $stateProvider
        .state('home', {
            url: "/home"
        })
        .state('menu', {
            url: "/vendors/menu",
            templateUrl: "/partials/vendors/vendorMenu.jade",
            controller: 'vendorMenuCtrl'
        })
        .state('menu.editItem', {
            url: "/editItem/:itemId",
            templateUrl: "/partials/vendors/itemDetails.jade",
            controller: 'itemDetailsCtrl'
        })
        .state('menu.addItem', {
            url: '/addItem'
        })
        .state('menu.editCategory', {
            url: "/editCategory/:categoryId"
        })
        .state('menu.addCategory', {
            url: "/addCategory"
        })
        .state('login', {
            url: "/login",
            templateUrl: "partials/login.jade"
        })
        .state('vendorProfile', {
            url: "/vendors/profile",
            templateUrl: "/partials/vendors/profile.jade"
        })
        .state('map', {
            url: "/map",
            templateUrl: "partials/map.jade"
        });
}]);


app.factory('myInterceptor', [ 'httpInterceptor',
    function (httpInterceptor) {
        return{
            request: function (config) {
                return httpInterceptor.request(config);
            }
        };
    }]);

app.config(['$httpProvider' , function ($httpProvider) {
    $httpProvider.interceptors.push('myInterceptor');
}]);