var app = angular.module('vendorApp', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
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
}]);

app.config(['$httpProvider'], function($httpProvider){
    //configure cross domain ajax
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $httpProvider.defaults.headers.common['Accept'] = 'application/json';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/json';

});