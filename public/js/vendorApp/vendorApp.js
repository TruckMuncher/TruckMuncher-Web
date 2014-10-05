var app = angular.module('vendorApp', ['ui.router', 'truckmuncher.tokenService']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
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

app.factory('httpInterceptor', ['TokenService', function (TokenService) {
    return{
        request: function (config) {
            if (TokenService.getFacebook().access_token) {
                config.headers['Authorization'] = 'access_token=' + TokenService.getFacebook().access_token;
            } else {
                config.headers['Authorization'] =
                     'oauth_token=' + TokenService.getTwitter().oauth_token +
                     ', oauth_secret=' + TokenService.getTwitter().oauth_token_secret;
            }
            return config;
        }
    }
}]);

app.config(['$httpProvider', function ($httpProvider) {
    //configure cross domain ajax
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $httpProvider.interceptors.push('httpInterceptor');

    $httpProvider.defaults.headers.common['Accept'] = 'application/json';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/json';

}]);