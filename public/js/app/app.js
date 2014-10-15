var app = angular.module('TruckMuncherApp', ['ui.router', 'localytics.directives', 'ui.bootstrap']);

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
            data: {
                templateUrl: '/partials/vendors/itemDetails.jade',
                controller: 'addOrEditItemModalCtrl'
            },
            controller: 'menuActionModalCtrl'
        })
        .state('menu.addItem', {
            url: '/category/:categoryId/addItem',
            data: {
                templateUrl: 'partials/vendors/itemDetails.jade',
                controller: 'addOrEditItemModalCtrl'
            },
            controller: 'menuActionModalCtrl'
        })
        .state('menu.editCategory', {
            url: "/category/:categoryId"
        })
        .state('menu.addCategory', {
            url: "/category"
        })
        .state('login', {
            url: "/login",
            templateUrl: "partials/login.jade"
        })
        .state('vendorProfile', {
            url: "/vendors/profile",
            templateUrl: "/partials/vendors/profile.jade",
            controller: 'vendorProfileCtrl'
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