angular.module('TruckMuncherApp').controller('mapCtrl',
    ['$scope', 'TruckService', 'uiGmapGoogleMapApi', 'TruckProfileService', 'growl', '$modal', 'MenuService', 'colorService', 'SearchService',
        function ($scope, TruckService, uiGmapGoogleMapApi, TruckProfileService, growl, $modal, MenuService, colorService, SearchService) {
            $scope.mapHeight = screen.height / 1.7 + 'px';
            $scope.loading = true;
            $scope.searchQuery = "";
            var lat;
            var lon;
            var allActiveTruckMarkers = [];
            $scope.displayedMarkers = [];
            $scope.infoWindow = {
                show: false,
                templateUrl: "/partials/map/infoWindow.jade",
                options: {
                    pixelOffset: {height: -20, width:0}
                },
                templateParameter: {marker: null, showMenuCallback: $scope.showMenuModal}
            };

            $scope.map = {
                center: {
                    latitude: 43.05,
                    longitude: -87.95
                },
                zoom: 12
            };

            $scope.currentPositionMarker = {};


            navigator.geolocation.getCurrentPosition(function (pos) {

                lat = pos.coords.latitude;
                lon = pos.coords.longitude;
                $scope.currentPositionMarker = {
                    id: 1,
                    icon: 'img/map_marker_green.png',
                    coords: {
                        latitude: lat,
                        longitude: lon
                    },
                    show: false
                };

                $scope.map.center = {latitude: lat, longitude: lon};

                getMarkers();
            }, function (error) {
                growl.addErrorMessage('Unable to get location: ' + error.message);
            });

            function getMarkers() {
                TruckService.getActiveTrucks(lat, lon).then(function (trucksResponse) {
                    allActiveTruckMarkers = [];
                    if (TruckProfileService.allTrucksInStoredProfiles(trucksResponse) && !TruckProfileService.cookieNeedsUpdate()) {
                        for (var i = 0; i < trucksResponse.length; i++) {
                            var marker = populateMarker(trucksResponse[i]);
                            allActiveTruckMarkers.push(marker);
                        }
                    } else {
                        TruckProfileService.updateTruckProfiles(lat, lon).then(function () {
                            for (var i = 0; i < trucksResponse.length; i++) {
                                var marker = populateMarker(trucksResponse[i]);
                                allActiveTruckMarkers.push(marker);
                            }
                        });
                    }
                    $scope.displayedMarkers = allActiveTruckMarkers;
                    $scope.loading = false;
                });
            }

            $scope.closeInfoWindow = function () {
                $scope.infoWindow.show = false;
            };

            function populateMarker(truck) {
                var truckProfile = TruckProfileService.getTruckProfile(truck.id, lat, lon);
                var marker = {
                    id: truck.id,
                    icon: 'img/SingleTruckAnnotationIcon.png',
                    coords: {
                        latitude: truck.latitude,
                        longitude: truck.longitude
                    }
                };

                if (!_.isNull(truckProfile) && !_.isUndefined(truckProfile)) {
                    marker.truckProfile = truckProfile;
                } else {
                    marker.truckProfile = {name: "Could not find profile for truck"};
                }

                return marker;
            }

            $scope.onMarkerClicked = function (clickEvent) {
                $scope.showMarkerWindow(clickEvent.model.id);
            };

            $scope.showMarkerWindow = function (id) {
                $scope.closeInfoWindow();
                var marker = _.find(allActiveTruckMarkers, function (marker) {
                    return marker.id === id;
                });

                $scope.map.center = {latitude: marker.coords.latitude, longitude: marker.coords.longitude};

                $scope.infoWindow.coords = marker.coords;
                $scope.infoWindow.show = true;
                $scope.infoWindow.templateParameter.marker = marker;

            };

            $scope.showMenuModal = function (truckId) {
                var truck = TruckProfileService.getTruckProfile(truckId);
                var customMenuColors = colorService.getCustomMenuColorsForTruck(truck);
                MenuService.getMenu(truckId).then(function (response) {
                    launchModal(response, customMenuColors);
                });
            };

            function launchModal(menu, customMenuColors) {
                var modalCtrl = ['$scope', 'menu', 'customMenuColors', '$modalInstance', function ($scope, menu, customMenuColors, $modalInstance) {
                    $scope.menu = menu;
                    $scope.customMenuColors = customMenuColors;

                    $scope.close = function () {
                        $modalInstance.close({});
                    };
                }];

                $scope.modalInstance = $modal.open({
                    templateUrl: "/partials/map/customer-menu.jade",
                    controller: modalCtrl,
                    resolve: {
                        menu: function () {
                            return menu;
                        },
                        customMenuColors: function () {
                            return customMenuColors;
                        }
                    }
                });
            }

            $scope.$watch('searchQuery', function () {
                if ($scope.searchQuery.length === 0 && $scope.displayedMarkers.length < allActiveTruckMarkers.length) {
                    $scope.displayedMarkers = allActiveTruckMarkers;
                }
            });

            $scope.simpleSearch = function (query) {
                $scope.displayedMarkers = [];
                $scope.loading = true;
                SearchService.simpleSearch(query, 20, 0).then(function (results) {
                    var resultTruckIds = _.map(results, function (r) {
                        return r.truck.id;
                    });
                    $scope.displayedMarkers = _.filter(allActiveTruckMarkers, function (marker) {
                        return _.contains(resultTruckIds, marker.truckProfile.id);
                    });
                    $scope.loading = false;
                });
            };
        }]);

