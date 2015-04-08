var app = angular.module('TruckMuncherApp',
    [
        'ui.router',
        'localytics.directives',
        'ui.bootstrap',
        'angular-growl',
        'ngAnimate',
        'ngTagsInput',
        'angularFileUpload',
        'ngCookies',
        'uiGmapgoogle-maps',
        'angularSpectrumColorpicker',
        'angulartics',
        'angulartics.google.analytics',
        'ngImgCrop'
    ]);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider:ng.ui.IStateProvider, $urlRouterProvider:ng.ui.IUrlRouterProvider) {
    $urlRouterProvider.otherwise("map");

    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "/partials/login.jade",
            authenticate: false
        })
        .state('map', {
            url: "/map",
            templateUrl: "/partials/map/map.jade",
            controller: 'mapCtrl',
            authenticate: false
        })
        .state('menu', {
            url: "/vendors/menu",
            templateUrl: "/partials/vendors/vendorMenu.jade",
            controller: 'vendorMenuCtrl',
            authenticate: true
        })
        .state('menu.editItem', {
            url: "/:truckId/category/:categoryId/item/:itemId",
            data: {
                templateUrl: '/partials/vendors/itemDetails.jade',
                controller: 'addOrEditItemModalCtrl'
            },
            controller: 'menuActionModalCtrl',
            authenticate: true
        })
        .state('menu.addItem', {
            url: '/:truckId/category/:categoryId/item',
            data: {
                templateUrl: '/partials/vendors/itemDetails.jade',
                controller: 'addOrEditItemModalCtrl'
            },
            controller: 'menuActionModalCtrl',
            authenticate: true
        })
        .state('menu.editCategory', {
            url: "/:truckId/category/:categoryId",
            data: {
                templateUrl: '/partials/vendors/categoryDetails.jade',
                controller: 'addOrEditCategoryModalCtrl'
            },
            controller: 'menuActionModalCtrl',
            authenticate: true
        })
        .state('menu.addCategory', {
            url: "/:truckId/category",
            data: {
                templateUrl: '/partials/vendors/categoryDetails.jade',
                controller: 'addOrEditCategoryModalCtrl'
            },
            controller: 'menuActionModalCtrl',
            authenticate: true
        })
        .state('vendorProfile', {
            url: "/vendors/profile",
            templateUrl: "/partials/vendors/profile.jade",
            controller: 'vendorProfileCtrl',
            authenticate: true
        })
        .state('truckProfiles', {
            url: "/trucks",
            controller: 'truckProfilesCtrl',
            templateUrl: "/partials/profiles/truckProfiles.jade",
            authenticate: false
        })
        .state('truckProfiles.details', {
            url: "/:id",
            controller: 'truckDetailsCtrl',
            templateUrl: '/partials/profiles/truckDetails.jade',
            authenticate: false
        })
        .state('userProfile', {
            url: '/user/profile',
            controller: 'userProfileCtrl',
            templateUrl: '/partials/users/profile.jade',
            authenticate: true
        })
        .state('privacyPolicy', {
            url: "/privacyPolicy",
            controller: ['$scope', function ($scope:ng.IScope) {
                $scope['pages'] = [
                    {name: 'main', title: 'Home'},
                    {name: 'data-collection', title: 'Data Collection'},
                    {name: 'analytics', title: 'Analytics'},
                    {name: 'location-services', title: 'Location Services'},
                    {name: 'social-networking', title: 'Social Networking'},
                    {name: 'security', title: 'Security/Retention'},
                    {name: 'control', title: 'Control'}
                ];
            }],
            templateUrl: "/partials/privacyPolicy/privacyIndex.jade",
            authenticate: false
        })
        .state('privacyPolicy.detail', {
            url: '/{name}',
            templateUrl: function ($stateParams:ng.ui.IStateParamsService) {
                return '/partials/privacyPolicy/' + $stateParams['name'] + '.jade';
            },
            authenticate:false
        })
        .state('about', {
            url: '/about',
            templateUrl: "/partials/about.jade",
            authenticate: false
        });
}]);


app.factory('myInterceptor', ['httpInterceptor', function (httpInterceptor) {
    return httpInterceptor;
}]);

app.config(['$httpProvider', function ($httpProvider:ng.IHttpProvider) {
    $httpProvider.interceptors.push('myInterceptor');
}]);

app.config(['growlProvider', function (growlProvider) {
    growlProvider.globalTimeToLive(5000);
    growlProvider.onlyUniqueMessages(true);
}]);

app.config(['$analyticsProvider', function ($analyticsProvider:IAngularticsProvider) {
    $analyticsProvider.firstPageview(true);
    /* Records pages that don't use $state or $route */
    $analyticsProvider.withAutoBase(true);
    /* Records full path */
}]);

app.run(['$rootScope', '$state', 'StateService', '$stateParams', function ($rootScope:ng.IRootScopeService, $state:ng.ui.IStateService, TokenService:IStateService, $stateParams) {

    $rootScope.$on("$stateChangeStart",
        function (event, toState) {
            if (toState.authenticate && !TokenService.getToken()) {
                $state.go("login");
                event.preventDefault();
            }
        });

    $rootScope['$state'] = $state;
    $rootScope['$stateParams'] = $stateParams;
}]);
