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
            url: "/:truckId/category/:categoryId/item/:itemId",
            data: {
                templateUrl: '/partials/vendors/itemDetails.jade',
                controller: 'addOrEditItemModalCtrl'
            },
            controller: 'menuActionModalCtrl'
        })
        .state('menu.addItem', {
            url: '/:truckId/category/:categoryId/item',
            data: {
                templateUrl: 'partials/vendors/itemDetails.jade',
                controller: 'addOrEditItemModalCtrl'
            },
            controller: 'menuActionModalCtrl'
        })
        .state('menu.editCategory', {
            url: "/:truckId/category/:categoryId",
            data: {
                templateUrl: 'partials/vendors/categoryDetails.jade',
                controller: 'addOrEditCategoryModalCtrl'
            },
            controller: 'menuActionModalCtrl'
        })
        .state('menu.addCategory', {
            url: "/:truckId/category",
            data: {
                templateUrl: 'partials/vendors/categoryDetails.jade',
                controller: 'addOrEditCategoryModalCtrl'
            },
            controller: 'menuActionModalCtrl'
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
        })
        .state('landing', {
            url: "/landing",
            templateUrl: "partials/landingPage.jade"
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