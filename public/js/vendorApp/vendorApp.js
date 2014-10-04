var app = angular.module('vendorApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise("/menu");

    $stateProvider
        .state('menu', {
            url: "/menu",
            templateUrl: "/partials/vendors/_vendorMenu.jade",
            controller: 'vendorMenuCtrl'
        })
        .state('itemDetails', {
            url: "/itemDetails",
            templateUrl: "/partials/vendors/_itemDetails.jade", 
            controller: 'itemDetailsCtrl'
        })
})