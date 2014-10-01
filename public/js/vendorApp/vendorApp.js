var app = angular.module('vendorApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/menu");

    $stateProvider
        .state('menu', {
            url: "/menu",
            templateUrl: "/partials/_vendorMenu.jade", 
            controller: 'menuListCtrl'
        })
})