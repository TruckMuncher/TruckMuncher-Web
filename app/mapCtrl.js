/**
 * Created by maconsuckow on 12/3/14.
 */
angular.module('TruckMuncherApp').controller('mapCtrl', ['$scope', 'TruckService', 'uiGmapGoogleMapApi', 'TruckProfileService', 'growl', '$modal', 'MenuService', 'colorService',
    function ($scope, TruckService, uiGmapGoogleMapApi, TruckProfileService, growl, $modal, MenuService, colorService) {
        $scope.mapHeight = screen.height / 1.7 + 'px';
        $scope.loading = true;
        var lat;
        var lon;

        $scope.map = {
            center: {
                latitude: 43.05,
                longitude: -87.95
            },
            zoom: 12
        };

        $scope.truckMarkers = [];

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
                $scope.truckMarkers = [];
                if (TruckProfileService.allTrucksInStoredProfiles(trucksResponse) && !TruckProfileService.cookieNeedsUpdate()) {
                    for (var i = 0; i < trucksResponse.length; i++) {
                        var marker = populateMarker(trucksResponse[i]);
                        $scope.truckMarkers.push(marker);
                    }
                } else {
                    TruckProfileService.updateTruckProfiles(lat, lon).then(function () {
                        for (var i = 0; i < trucksResponse.length; i++) {
                            var marker = populateMarker(trucksResponse[i]);
                            $scope.truckMarkers.push(marker);
                        }
                    });
                }
                $scope.loading = false;
            });
        }

        function populateMarker(truck) {
            var truckProfile = TruckProfileService.getTruckProfile(truck.id, lat, lon);
            var marker = {
                id: truck.id,
                icon: 'img/SingleTruckAnnotationIcon.png',
                coords: {
                    latitude: truck.latitude,
                    longitude: truck.longitude
                },
                show: false
            };

            if (!_.isNull(truckProfile) && !_.isUndefined(truckProfile)) {
                marker.truckProfile = truckProfile;
            } else {
                marker.truckProfile = {name: "Could not find profile for truck"};
            }

            return marker;
        }

        $scope.showMarkerWindow = function (id) {
            _.forEach($scope.truckMarkers, function (marker) {
                marker.show = false;
            });
            var marker = _.find($scope.truckMarkers, function (marker) {
                return marker.id === id;
            });

            $scope.map.center = {latitude: marker.coords.latitude, longitude: marker.coords.longitude};

            marker.show = true;
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
    }]);

