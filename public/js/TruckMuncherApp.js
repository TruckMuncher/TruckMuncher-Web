var app = angular.module('TruckMuncherApp',
    [
        'ui.router',
        'localytics.directives',
        'ui.bootstrap',
        'angular-growl',
        'ngAnimate',
        'ngTagsInput',
        'angularFileUpload',
        'uiGmapgoogle-maps',
        'ngCookies',
        'angularSpectrumColorpicker'
    ]);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("map");

    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "partials/login.jade",
            authenticate: false
        })
        .state('map', {
            url: "/map",
            templateUrl: "partials/map.jade",
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
                templateUrl: 'partials/vendors/itemDetails.jade',
                controller: 'addOrEditItemModalCtrl'
            },
            controller: 'menuActionModalCtrl',
            authenticate: true
        })
        .state('menu.editCategory', {
            url: "/:truckId/category/:categoryId",
            data: {
                templateUrl: 'partials/vendors/categoryDetails.jade',
                controller: 'addOrEditCategoryModalCtrl'
            },
            controller: 'menuActionModalCtrl',
            authenticate: true
        })
        .state('menu.addCategory', {
            url: "/:truckId/category",
            data: {
                templateUrl: 'partials/vendors/categoryDetails.jade',
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
        });
}]);


app.factory('myInterceptor', ['httpInterceptor', function (httpInterceptor) {
    return httpInterceptor;
}]);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('myInterceptor');
}]);

app.config(['growlProvider', function (growlProvider) {
    growlProvider.globalTimeToLive(3000);
    growlProvider.onlyUniqueMessages(false);
}]);

app.run(function ($rootScope, $state, TokenService) {

    $rootScope.$on("$stateChangeStart",
        function (event, toState) {
            if (toState.authenticate && !TokenService.getToken()) {
                $state.go("login");
                event.preventDefault();
            }
        });
});

;/** Requires base64.js from base-64 package*/
angular.module('TruckMuncherApp').factory('TokenService', function () {
    var session_token = null;
    return {
        setToken: function (sessionToken) {
            session_token = sessionToken;
        },
        getToken: function () {
            return session_token;
        }
    };
});

app.factory('TimestampAndNonceService', function () {
    function twoDigitNumber(n) {
        return n < 10 ? '0' + n : '' + n;
    }

    var guid = (function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return function () {
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        };
    })();

    return{
        getTimestamp: function () {
            var d = new Date(new Date().getTime());
            return d.getUTCFullYear() + '-' +
                twoDigitNumber(d.getUTCMonth() + 1) + '-' +
                twoDigitNumber(d.getUTCDate()) + 'T' +
                twoDigitNumber(d.getUTCHours()) + ':' +
                twoDigitNumber(d.getUTCMinutes()) + ':' +
                twoDigitNumber(d.getUTCSeconds()) + 'Z';
        },
        getNonce: function () {
            var uuid = guid();
            var _32randomChars = uuid.replace(/-/gi, '');
            return base64.encode(_32randomChars);
        }
    };
});


app.factory('httpInterceptor', ['TokenService', 'TimestampAndNonceService', '$location', '$q', 'growl',
    function (TokenService, TimestampAndNonceService, $location, $q) {
        return{
            request: function (config) {
                // oauth headers
                if (TokenService.getToken()) {
                    config.headers.Authorization = 'session_token=' + TokenService.getToken();
                }

                //nonce and timestamp headers
                config.headers['X-Timestamp'] = TimestampAndNonceService.getTimestamp();
                config.headers['X-Nonce'] = TimestampAndNonceService.getNonce();

                //configure cross domain
                delete config['X-Requested-With'];
                config.crossDomain = true;

                // json headers
                config.headers.Accept = 'application/json';
                config.headers['Content-Type'] = 'application/json';

                return config;
            },
            responseError: function (rejection) {
                if (rejection.status === 401) {
                    TokenService.setToken(null);
                    $location.path('/login');
                }
                return $q.reject(rejection);
            }
        };
    }]);



;angular.module('TruckMuncherApp').directive('focusInvalidForm', function () {
    var link = function (scope, elem) {
        elem.on('submit', function () {
            var invalidElements = elem.find('.ng-invalid');
            if (invalidElements && invalidElements.length > 0) {
                var firstInvalid = $(invalidElements[0]);
                focusElement(firstInvalid);
            }
        });

        function focusElement(element) {
            if (elementIsChosenSelect(element)) {
                var idOfChosenDivForElement = element.attr("id") + "_chosen";
                $('#' + idOfChosenDivForElement).find(".chosen-single").focus();
            } else {
                element[0].focus();
            }
        }

        function elementIsChosenSelect(element) {
            return element.attr("data-chosen") === "";
        }

    };

    return {
        restrict: 'A',
        link: link
    };
});
;angular.module('TruckMuncherApp').directive('imageLoader', ['$timeout', function ($timeout) {
    var link = function (scope, elem) {
        elem.on('load', function () {
            $timeout(function () {
                scope.isLoading = false;
            });
        });

        scope.$watch('mysrc', function () {
            $timeout(function () {
                scope.isLoading = true;
            });
        });
    };

    return {
        restrict: 'A',
        scope: {mysrc: '=', isLoading: '='},
        link: link
    };
}]);
;angular.module('TruckMuncherApp').directive('profileImageUpload', ['TruckService', 'growl', 'FileUploader', 'TimestampAndNonceService', 'TokenService', '$timeout',
    function (TruckService, growl, FileUploader, TimestampAndNonceService, TokenService) {
        var blankImageUri = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
        var link = {
            pre: function preLink(scope) {
                scope.imageLoading = false;
                scope.uploader = new FileUploader({
                    autoUpload: true,
                    removeAfterUpload: true,
                    headers: {
                        Authorization: 'session_token=' + TokenService.getToken(),
                        Accept: 'application/json',
                        'X-Nonce': TimestampAndNonceService.getNonce(),
                        'X-Timestamp': TimestampAndNonceService.getTimestamp()
                    }
                });

                scope.uploader.onProgressItem = function (item, progress) {
                    scope.progress = progress;
                };

                scope.uploader.onErrorItem = function () {
                    growl.addErrorMessage('Error: could not upload image');
                };

                scope.uploader.onSuccessItem = function (fileItem, response) {
                    scope.truck.imageUrl = response.url + '?' + new Date().getTime();
                    scope.displayImage = scope.truck.imageUrl;
                    scope.progress = null;
                };

                scope.$watch('truck', function () {
                    scope.uploader.url = TruckService.getImageUploadUrl(scope.truck.id);

                    if (scope.truck && scope.truck.imageUrl) {
                        if (stripUIDFromImageUrl(scope.displayImage) !== scope.truck.imageUrl)
                            scope.displayImage = scope.truck.imageUrl + '?' + new Date().getTime();
                    } else {
                        scope.displayImage = blankImageUri;
                    }
                });

                function stripUIDFromImageUrl(imageUrl) {
                    if (imageUrl)return imageUrl.substring(0, imageUrl.lastIndexOf('?'));
                    else return "";
                }

            }
        };

        return {
            restrict: 'A',
            link: link,
            scope: {truck: '='},
            replace: true,
            templateUrl: '/partials/directiveTemplates/profile-image-upload.jade'
        };
    }]);
;angular.module('TruckMuncherApp').directive('remoteImageAnalyzer', ['$rootScope', 'colorThief', '$timeout', 'colorService',
    function ($rootScope, colorThief, $timeout, colorService) {
        var link = function (scope) {
            var img = document.createElement('img');
            var crossOriginImage = document.createElement('img');
            var canvas = document.createElement('canvas');

            var ctx = canvas.getContext('2d');
            crossOriginImage.onload = function () {
                ctx.drawImage(crossOriginImage, 0, 0, canvas.width, canvas.height);
                analyzeImage(canvas.toDataURL());
            };
            crossOriginImage.crossOrigin = '';
            scope.$watch('imageUrl', function () {
                scope.palette = null;
                scope.dominantColor = null;

                if (scope.imageUrl) {
                    scope.processing = true;
                    crossOriginImage.src = scope.imageUrl + '?' + new Date().getTime();
                }
            });

            function analyzeImage(imageData) {
                img.src = imageData;
            }

            img.onload = function () {
                var rgbPalette = colorThief.getPalette(img, 8);
                var dominant = colorThief.getColor(img);

                $timeout(function () {
                    scope.processing = false;
                    scope.palette = colorService.RGBsToHexWithDarkIndicator(rgbPalette);
                    scope.dominantColor = colorService.RGBsToHexWithDarkIndicator([dominant])[0];
                });
            };

            scope.colorClicked = function (color) {
                scope.colorClickCallback({theColor: color});
            };
        };

        return {
            restrict: 'A',
            link: link,
            replace: true,
            scope: {imageUrl: '=', colorClickCallback: '&'},
            templateUrl: '/partials/directiveTemplates/remote-image-analyzer.jade'
        };
    }]);;var FLOAT_REGEXP = /^\-?\d+((\.|\,)\d{1,2})?$/;
angular.module('TruckMuncherApp').directive('smartPrice', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (FLOAT_REGEXP.test(viewValue)) {
                    ctrl.$setValidity('float', true);
                    return parseFloat(viewValue.replace(',', '.'));
                } else {
                    ctrl.$setValidity('float', false);
                    return undefined;
                }
            });
        }
    };
});;angular.module('TruckMuncherApp').factory('colorThief', function () {
    return new ColorThief();
});
;angular.module('TruckMuncherApp').controller('headerCtrl', ['$scope', '$rootScope', 'TokenService',
    function ($scope, $rootScope, TokenService) {
        $scope.toggleMenu = function(){
            $rootScope.$emit('toggleMenu');
        };

        $scope.loggedIn = function(){
            return !_.isNull(TokenService.getToken());
        };
    }]);
;angular.module('TruckMuncherApp').controller('initCtrl', ['$scope', 'TokenService', 'httpHelperService',
    function ($scope, TokenService, httpHelperService) {
        $scope.initializeToken = function (sessionToken) {
            if (sessionToken !== 'undefined' && sessionToken !== 'null') {
                TokenService.setToken(sessionToken);
            } else {
                TokenService.setToken(null);
            }
        };

        $scope.initializeApiUrl = function (url) {
            httpHelperService.setApiUrl(url);
        };
    }
]);;/**
 * Created by maconsuckow on 12/3/14.
 */
angular.module('TruckMuncherApp').controller('mapCtrl', ['$scope', 'TruckService', 'uiGmapGoogleMapApi', 'TruckProfileService', 'growl', '$q',
    function ($scope, TruckService, uiGmapGoogleMapApi, TruckProfileService, growl, $q) {
        var lat;
        var lon;

        $scope.map = {
            center: {
                latitude: 43.05,
                longitude: -87.95
            },
            zoom: 12
        };

        $scope.randomMarkers = [];

        navigator.geolocation.getCurrentPosition(function (pos) {

            lat = pos.coords.latitude;
            lon = pos.coords.longitude;

            $scope.map.center = {latitude: lat, longitude: lon};

            getMarkers();

            $scope.$apply();
        }, function (error) {
            growl.addErrorMessage('Unable to get location: ' + error.message);
        });

        function getMarkers() {
            TruckService.getActiveTrucks(lat, lon).then(function (trucksResponse) {
                $scope.randomMarkers = [];
                if (TruckProfileService.allTrucksInStoredProfiles(trucksResponse) && !TruckProfileService.cookieNeedsUpdate()) {
                    for (var i = 0; i < trucksResponse.length; i++) {
                        var marker = populateMarker(trucksResponse[i]);
                        $scope.randomMarkers.push(marker);
                    }
                } else {
                    TruckProfileService.updateTruckProfiles(lat, lon).then(function () {
                        for (var i = 0; i < trucksResponse.length; i++) {
                            var marker = populateMarker(trucksResponse[i]);
                            $scope.randomMarkers.push(marker);
                        }
                    });
                }

            });
        }

        function populateMarker(truck) {
            var truckProfile = TruckProfileService.getTruckProfile(truck.id, lat, lon);
            var marker = {
                id: truck.id,
                icon: 'img/SingleTruckAnnotationIcon.png',
                latitude: truck.latitude,
                longitude: truck.longitude,
                show: false,
                options: {
                    maxWidth: 150
                }
            };

            if (!_.isNull(truckProfile) && !_.isUndefined(truckProfile)) {
                marker.options.content = "<b>" + truckProfile.name + "</b>" +
                "<p>" + truckProfile.keywords + "</p>";
            } else {
                marker.options.content = "Could not find truck profile";
            }

            return marker;
        }
    }]);
;angular.module('TruckMuncherApp').controller('navCtrl', ['$scope', '$rootScope', 'TokenService',
    function ($scope, $rootScope, TokenService) {
        $scope.loggedIn = function () {
            return !_.isNull(TokenService.getToken());
        };
    }]);
;angular.module('TruckMuncherApp')
    .factory('httpHelperService', ['$http', '$q', 'growl', function ($http, $q, growl) {
        var apiUrl = 'https://api.truckmuncher.com:8443';
        return {
            post: function (url, data, responseDataName) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: url,
                    data: data,
                    crossDomain: true
                }).then(function (response) {
                    if (responseDataName) deferred.resolve(response.data[responseDataName]);
                    else deferred.resolve(response.data);
                }, function (error) {
                    if (error.data && error.data.userMessage) {
                        growl.addErrorMessage('Error: ' + error.data.userMessage);
                    } else {
                        growl.addErrorMessage('An unknown error occurred');
                    }
                    deferred.reject(error);
                });
                return deferred.promise;
            },
            setApiUrl: function (url) {
                apiUrl = url;
            },
            getApiUrl: function () {
                return apiUrl;
            }
        };
    }]);;angular.module('TruckMuncherApp')
    .factory('MenuService', ['httpHelperService', function (httpHelperService) {
        return {
            getFullMenus: function (latitude, longitude, includeAvailability) {
                var url = httpHelperService.getApiUrl() + '/com.truckmuncher.api.menu.MenuService/getFullMenus';
                var data = {'latitude': latitude, 'longitude': longitude, 'includeAvailability': includeAvailability};
                return httpHelperService.post(url, data);
            },
            getMenu: function (truckId) {
                var url = httpHelperService.getApiUrl() + '/com.truckmuncher.api.menu.MenuService/getMenu';
                var data = {'truckId': truckId};
                return httpHelperService.post(url, data, 'menu');
            },
            getItem: function (itemId) {
                var url = httpHelperService.getApiUrl() + '/com.truckmuncher.api.menuadmin.MenuAdminService/getMenuItem';
                var data = {'menuItemId': itemId};
                return httpHelperService.post(url, data, 'menuItem');
            },
            getCategory: function (categoryId) {
                var url = httpHelperService.getApiUrl() + '/com.truckmuncher.api.menuadmin.MenuAdminService/getCategory';
                var data = {'categoryId': categoryId};
                return httpHelperService.post(url, data, 'category');
            },
            addOrUpdateCategory: function (category, truckId) {
                return this.addOrUpdateCategories([category], truckId);
            },
            addOrUpdateCategories: function(categories, truckId){
                var url = httpHelperService.getApiUrl() + '/com.truckmuncher.api.menuadmin.MenuAdminService/modifyCategory';
                var data = {'categories': categories, 'truckId': truckId};
                return httpHelperService.post(url, data, 'menu');
            },
            addOrUpdateItem: function (item, truckId, categoryId) {
                return this.addOrUpdateItems([item], truckId, categoryId);
            },
            addOrUpdateItems: function (items, truckId, categoryId) {
                var url = httpHelperService.getApiUrl() + '/com.truckmuncher.api.menuadmin.MenuAdminService/modifyMenuItem';
                var data = {'menuItems': items, 'truckId': truckId, 'categoryId': categoryId};
                return httpHelperService.post(url, data, 'menu');
            },
            deleteCategory: function (truckId, categoryId) {
                var url = httpHelperService.getApiUrl() + '/com.truckmuncher.api.menuadmin.MenuAdminService/deleteCategory';
                var data = {'truckId': truckId, 'categoryId': categoryId};
                return httpHelperService.post(url, data, 'menu');
            },
            deleteItem: function (truckId, menuItemId) {
                var url = httpHelperService.getApiUrl() + '/com.truckmuncher.api.menuadmin.MenuAdminService/deleteMenuItem';
                var data = {'truckId': truckId, 'menuItemId': menuItemId};
                return httpHelperService.post(url, data, 'menu');
            },
            getTags: function () {
                var url = httpHelperService.getApiUrl() + '/com.truckmuncher.api.menuadmin.MenuAdminService/getValidMenuItemTags';
                var data = {};
                return httpHelperService.post(url, data, 'tags');
            }
        };
    }]);;angular.module('TruckMuncherApp').factory('colorService', function () {
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    function isDark(r, g, b) {
        var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq < 128);
    }

    return {
        RGBsToHexWithDarkIndicator: function (rgbArray) {
            var hexArray = _.map(rgbArray, function (val) {
                return rgbToHex(val[0], val[1], val[2]);
            });
            var isDarkArray = _.map(rgbArray, function (val) {
                return isDark(val[0], val[1], val[2]);
            });

            var pairs = _.zip(hexArray, isDarkArray);

            return _.map(pairs, function (pair) {
                return {'hexColor': pair[0], 'isDark': pair[1]};
            });
        }
    };
});;angular.module('TruckMuncherApp').factory('TruckProfileService', ['TruckService', '$q', '$cookieStore',
    function (TruckService, $q, $cookieStore) {
        var millisecondsInADay = 86400000;

        return {
            updateTruckProfiles: function (latitude, longitude) {
                var deferred = $q.defer();
                TruckService.getTruckProfiles(latitude, longitude).then(function (response) {
                    $cookieStore.put('truckProfiles', response);
                    $cookieStore.put('truckProfilesLastUpdatedDate', "" + Date.now());
                    deferred.resolve(response);
                });
                return deferred.promise;
            },
            cookieNeedsUpdate: function () {
                var lastUpdated = $cookieStore.get('truckProfilesLastUpdatedDate');
                return _.isNull(lastUpdated) || _.isUndefined(lastUpdated) || _.isNaN(lastUpdated) || Date.now() - lastUpdated > millisecondsInADay;
            },
            allTrucksInStoredProfiles: function (trucks) {
                var storedTrucks = $cookieStore.get('truckProfiles');
                if (_.isNull(storedTrucks) || _.isUndefined(storedTrucks) || _.isNull(trucks) || _.isUndefined(trucks))
                    return false;

                for (var i = 0; i < trucks.length; i++) {
                    if (!_.some(storedTrucks, {'id': trucks[i].id}))
                        return false;
                }

                return true;
            },
            getTruckProfile: function (truckId) {
                var profiles = getTruckProfilesFromCookie();
                return _.find(profiles, function (x) {
                    return x.id === truckId;
                });
            }
        };
        function getTruckProfilesFromCookie() {
            return $cookieStore.get('truckProfiles');
        }

    }]);;angular.module('TruckMuncherApp')
    .factory('TruckService', ['httpHelperService', '$q', function (httpHelperService, $q) {
        return {
            getTrucksForVendor: function () {
                var url = httpHelperService.getApiUrl() + '/com.truckmuncher.api.trucks.TruckService/getTrucksForVendor';
                return httpHelperService.post(url, {}, 'trucks');
            },
            modifyTruckProfile: function (truckId, name, keywords, primaryColor, secondaryColor) {
                var url = httpHelperService.getApiUrl() + '/com.truckmuncher.api.trucks.TruckService/modifyTruckProfile';
                return httpHelperService.post(url,
                    {
                        id: truckId,
                        name: name,
                        keywords: keywords,
                        primaryColor: primaryColor,
                        secondaryColor: secondaryColor
                    }
                );
            },
            getImageUploadUrl: function (truckId) {
                return httpHelperService.getApiUrl() + '/com.truckmuncher.api.file.FileService/uploadFile/' + truckId;
            },
            getActiveTrucks: function (latitude, longitude) {
                //var url = httpHelperService.getApiUrl() + '/com.truckmuncher.api.trucks.TruckService/getActiveTrucks';
                //var data = {'latitude': latitude, 'longitude': longitude};
                //return httpHelperService.post(url, data, 'trucks');

                var deferred = $q.defer();
                deferred.resolve([
                    {id: "2d1dada3-80f1-4c0e-b878-a02626aafea7", latitude: 43.05, longitude: -87.95},
                    {id: "2d1dada3-80f1-4c0e-b878-a02626aafea6", latitude: 43.046978, longitude: -87.904087},
                    {id: "2d1dada3-80f1-4c0e-b878-a02626aafea5", latitude: 43.044093, longitude: -87.902027},
                    {id: "2d1dada3-80f1-4c0e-b878-a02626aafea4", latitude: 43.045849, longitude: -87.899795}
                ]);
                return deferred.promise;
            },
            getTruckProfiles: function (latitude, longitude) {
                var url = httpHelperService.getApiUrl() + '/com.truckmuncher.api.trucks.TruckService/getTruckProfiles';
                return httpHelperService.post(url, {'latitude': latitude, 'longitude': longitude}, 'trucks');
            }
        };
    }]);
;angular.module('TruckMuncherApp').controller('confirmDialogCtrl', function ($scope, $modalInstance, dialogInfo) {
    $scope.dialogInfo = dialogInfo;

    $scope.ok = function () {
        $modalInstance.close({});
    };

    $scope.cancel = function () {
        $modalInstance.dismiss({});
    };
});;angular.module('TruckMuncherApp').factory('confirmDialogService', ['$modal', '$q', function ($modal, $q) {
    return{
        launch: function (size, title, body, acceptText, rejectText) {

            var modalInstance = $modal.open({
                templateUrl: '/partials/shared/confirmDialog.jade',
                controller: 'confirmDialogCtrl',
                size: size,
                resolve: {
                    dialogInfo: function () {
                        return {
                            title: title,
                            body: body,
                            acceptText: acceptText,
                            rejectText: rejectText
                        };
                    }
                }
            });

            return modalInstance.result;
        }
    };
}]);;angular.module('TruckMuncherApp').controller('addOrEditCategoryModalCtrl', ['$scope', '$modalInstance', '$stateParams', '$state', 'MenuService',
    function ($scope, $modalInstance, $stateParams, $state, MenuService) {
        $scope.category = {};
        $scope.requestInProgress = false;

        (function () {
            if ($state.current.name === 'menu.editCategory') {
                MenuService.getCategory($stateParams.categoryId).then(function (response) {
                    $scope.category = response;
                });
            }
        })();

        $scope.submit = function () {
            if (!$scope.requestInProgress) {
                $scope.requestInProgress = true;
                var categoryClone = _.clone($scope.category);
                delete categoryClone.menuItems;

                MenuService.addOrUpdateCategory(categoryClone, $stateParams.truckId).then(function (response) {
                    $modalInstance.close(response);
                }, function () {
                    $scope.requestInProgress = false;
                });
            }
        };

        $scope.$on('$stateChangeSuccess', function () {
            $modalInstance.dismiss('dismissFromStateChange');
        });
    }]);
;angular.module('TruckMuncherApp').controller('addOrEditItemModalCtrl', ['$scope', 'MenuService', '$modalInstance', '$stateParams', '$state',
    function ($scope, MenuService, $modalInstance, $stateParams, $state) {
        $scope.item = {};
        $scope.requestInProgress = false;

        (function () {
            $scope.item.isAvailable = true;
            MenuService.getTags().then(function (response) {
                $scope.allTags = response;
                $scope.item.tags = [];
            });

            if ($state.current.name === 'menu.editItem') {
                MenuService.getItem($stateParams.itemId).then(function (response) {
                    $scope.item = response;
                });
            }
        })();


        $scope.submit = function () {
            if (!$scope.requestInProgress) {
                $scope.requestInProgress = true;
                MenuService.addOrUpdateItem(
                    $scope.item,
                    $stateParams.truckId,
                    $stateParams.categoryId).then(function (response) {
                        $modalInstance.close(response);
                    }, function () {
                        $scope.requestInProgress = false;
                    });
            }
        };

        $scope.$on('$stateChangeSuccess', function () {
            $modalInstance.dismiss('dismissFromStateChange');
        });
    }]);;angular.module('TruckMuncherApp').controller('menuActionModalCtrl', ['$scope', '$stateParams', '$modal', '$state',
    function ($scope, $stateParams, $modal, $state) {

        $scope.openModal = function () {
            $scope.modalInstance = $modal.open({
                templateUrl: $state.current.data.templateUrl,
                controller: $state.current.data.controller
            });

            $scope.modalInstance.result.then(function (response) {
                $scope.$emit('menuUpdated', response);
                $state.go('menu');
            }, function (response) {
                if ($state.current.name !== 'menu' && response !== 'dismissFromStateChange') {
                    $state.go('menu');
                }
            });
        };

        $scope.openModal();
    }

]);
;angular.module('TruckMuncherApp').controller('vendorMenuCtrl', ['$scope', 'MenuService', 'TruckService', '$state', 'confirmDialogService',
    function ($scope, MenuService, TruckService, $state, confirmDialog) {
        $scope.selectedTruck = null;
        $scope.menu = {};

        TruckService.getTrucksForVendor().then(function (response) {
            $scope.trucks = response;
            if ($scope.trucks.length > 0) {
                $scope.selectedTruck = $scope.trucks[0].id;
            }
        });

        $scope.$watch('selectedTruck', function () {
            if ($scope.selectedTruck && $scope.menu.truckId !== $scope.selectedTruck) {
                MenuService.getMenu($scope.selectedTruck).then(function (response) {
                    $scope.menu = response;
                });
            }
        });

        $scope.toggleItemAvailability = function(item, categoryId){
            var itemClone = _.clone(item);
            itemClone.isAvailable = !item.isAvailable;
            MenuService.addOrUpdateItem(
                itemClone,
                $scope.selectedTruck,
                categoryId).then(function (response) {
                    $scope.menu = response;
                });
        };

        $scope.deleteItem = function (itemId) {
            var body = 'Are you sure you want to delete this item?';
            confirmDialog.launch(null, 'Delete Item', body, 'Yes', 'No').then(function () {
                MenuService.deleteItem($scope.selectedTruck, itemId).then(function (response) {
                    $scope.menu = response;
                });
            });
        };

        $scope.moveItemDown = function (categoryId, index) {
            moveItem(categoryId, index, 1);
        };

        $scope.moveItemUp = function (categoryId, index) {
            moveItem(categoryId, index, -1);
        };

        function moveItem(categoryId, indexOfItem, swapLocationFromIndex) {
            var sortedItems = getSortedItems(categoryId);
            var theItem = _.clone(sortedItems[indexOfItem]);
            var otherItem = _.clone(sortedItems[indexOfItem + swapLocationFromIndex]);
            theItem.orderInCategory = indexOfItem + swapLocationFromIndex;
            otherItem.orderInCategory = indexOfItem;

            MenuService.addOrUpdateItems([theItem, otherItem], $scope.selectedTruck, categoryId).then(function (response) {
                $scope.menu = response;
            });
        }

        function getSortedItems(categoryId) {
            var category = _.find($scope.menu.categories, function (c) {
                return c.id === categoryId;
            });
            return  _.sortBy(category.menuItems, function (i) {
                return i.orderInCategory;
            });
        }

        $scope.moveCategoryUp = function (index) {
            moveCategory(index, -1);
        };

        $scope.moveCategoryDown = function (index) {
            moveCategory(index, 1);
        };

        function moveCategory(indexOfCategory, swapLocationFromIndex) {
            var sorted = getSortedCategories();
            var theCategory = _.clone(sorted[indexOfCategory]);
            var otherCategory = _.clone(sorted[indexOfCategory + swapLocationFromIndex]);
            theCategory.orderInMenu = indexOfCategory + swapLocationFromIndex;
            otherCategory.orderInMenu = indexOfCategory;

            delete theCategory.menuItems;
            delete otherCategory.menuItems;
            MenuService.addOrUpdateCategories([theCategory, otherCategory], $scope.selectedTruck).then(function (response) {
                $scope.menu = response;
            });
        }

        function getSortedCategories() {
            return _.sortBy($scope.menu.categories, function (c) {
                return c.orderInMenu;
            });
        }

        $scope.deleteCategory = function (categoryId) {
            var body = 'Are you sure you want to delete this category? All items in the category will also be deleted.';
            confirmDialog.launch(null, 'Delete Category', body, 'Yes', 'No').then(function () {
                MenuService.deleteCategory($scope.selectedTruck, categoryId).then(function (response) {
                    $scope.menu = response;
                });
            });
        };

        $scope.$on('menuUpdated', function (event, data) {
            $scope.menu = data;
            $scope.selectedTruck = $scope.menu.truckId;
        });

        $scope.addItem = function (truckId, categoryId) {
            $state.go('.addItem', {truckId: truckId, categoryId: categoryId});
        };
    }
]);;angular.module('TruckMuncherApp').controller('vendorProfileCtrl', ['$scope', 'TruckService', 'growl',
    function ($scope, TruckService, growl) {
        $scope.trucks = [];
        $scope.selectedTruck = {};
        $scope.tags = [];
        $scope.newColorSelection = {};
        $scope.selectingColor = null;
        $scope.colorPicker = {};

        $scope.saveTruck = function () {
            var keywords = _.map($scope.tags, function (tag) {
                return tag.text;
            });

            $scope.requestInProgress = true;
            TruckService.modifyTruckProfile(
                $scope.selectedTruck.id,
                $scope.newName,
                keywords,
                $scope.newColorSelection.primaryColor,
                $scope.newColorSelection.secondaryColor
            ).then(function (response) {
                    $scope.requestInProgress = false;
                    growl.addSuccessMessage('Profile Updated Successfully');
                    refreshTruck(response);
                }, function () {
                    $scope.requestInProgress = false;
                });
        };

        $scope.createTruck = function () {
            $scope.requestInProgress = true;
            TruckService.modifyTruckProfile(null, 'New Truck', null, []).then(function (response) {
                $scope.requestInProgress = false;
                growl.addSuccessMessage('Truck Created Successfully');
                $scope.trucks.push(response);
                refreshTruck(response);
            }, function () {
                $scope.requestInProgress = false;
            });
        };

        $scope.submit = function () {
            $scope.saveTruck();
        };

        function refreshTruck(truck) {
            var index = _.findIndex($scope.trucks, function (t) {
                return t.id === truck.id;
            });
            if (index >= 0) {
                $scope.trucks[index] = truck;
                $scope.selectedTruck = truck;
            }
        }

        TruckService.getTrucksForVendor().then(function (response) {
            $scope.trucks = response;
            if ($scope.trucks.length > 0) {
                $scope.selectedTruck = $scope.trucks[0];
            }
        });

        $scope.$watch('selectedTruck', function () {
            $scope.setFormValuesFromSelectedTruck();
        });

        $scope.resetTruck = function () {
            $scope.setFormValuesFromSelectedTruck();
        };

        $scope.setFormValuesFromSelectedTruck = function () {
            convertKeywordsToTags();
            if ($scope.selectedTruck) {
                $scope.newName = $scope.selectedTruck.name;
                $scope.newColorSelection.primaryColor = $scope.selectedTruck.primaryColor;
                $scope.newColorSelection.secondaryColor = $scope.selectedTruck.secondaryColor;
            }
            $scope.selectingColor = "primary";
            $scope.selectColor($scope.newColorSelection.primaryColor);
        };

        $scope.selectColor = function (theColor) {
            if (theColor !== $scope.colorPicker.color)
                $scope.colorPicker.color = theColor;
            if ($scope.selectingColor === "primary")
                $scope.newColorSelection.primaryColor = theColor;
            else if ($scope.selectingColor === "secondary")
                $scope.newColorSelection.secondaryColor = theColor;
        };

        $scope.$watch('selectingColor', function () {
            if ($scope.selectingColor === "primary")
                $scope.colorPicker.color = $scope.newColorSelection.primaryColor;
            else if ($scope.selectingColor === "secondary")
                $scope.colorPicker.color = $scope.newColorSelection.secondaryColor;
        });

        function convertKeywordsToTags() {
            $scope.tags = _.map($scope.selectedTruck.keywords, function (keyword) {
                return {text: keyword};
            });
        }
    }]);
