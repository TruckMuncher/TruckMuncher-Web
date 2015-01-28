/* @flow weak */

function mapCtrl($scope, growl, colorService: IColorService, SearchService: ISearchService, MarkerService: IMarkerService, $timeout, $analytics, ModalMenuService: IModalMenuService) {
    $scope.mapHeight = screen.height / 1.7 + 'px';
    $scope.loading = true;
    $scope.searchQuery = "";
    var allActiveTruckMarkers: Array < ITruckMarker > = [];
    $scope.displayedMarkers = [];
    $scope.infoWindow = {
        show: false,
        templateUrl: "/partials/map/infoWindow.jade",
        options: {
            pixelOffset: {
                height: -20,
                width: 0
            }
        }
    };

    $scope.map = {
        center: {
            latitude: 43.05,
            longitude: -87.95
        },
        zoom: 12
    };

    $scope.currentPositionMarker = {};

    navigator.geolocation.getCurrentPosition(function(pos) {
        var lat: number = pos.coords.latitude;
        var lon: number = pos.coords.longitude;
        $scope.currentPositionMarker = {
            id: 1,
            icon: 'img/map_marker_green.png',
            coords: {
                latitude: lat,
                longitude: lon
            },
            show: false
        };

        $scope.map.center = {
            latitude: lat,
            longitude: lon
        };

        getMarkers(lat, lon);
    }, function(error) {
        growl.addErrorMessage('Unable to get location: ' + error.message);
    });

    function getMarkers(lat: number, lon: number) {
        $scope.loading = true;
        allActiveTruckMarkers = [];
        MarkerService.getMarkers(lat, lon).then(function(markers: Array < ITruckMarker > ) {
            allActiveTruckMarkers = markers;
            $scope.loading = false;
            $scope.displayedMarkers = allActiveTruckMarkers;
        });
    }

    $scope.closeInfoWindow = function() {
        $scope.infoWindow.show = false;
    };

    $scope.onMarkerClicked = function(clickEvent) {
        showMarkerWindow(clickEvent.model);

        $analytics.eventTrack('MarkerClicked', {
            category: 'Map',
            label: clickEvent.model.truckProfile.name
        });
    };

    $scope.onProfileClicked = function(marker: ITruckMarker) {
        showMarkerWindow(marker);
        $analytics.eventTrack('ProfileClicked', {
            category: 'Map',
            label: marker.truckProfile.name
        });
    };

    function showMarkerWindow(marker: ITruckMarker) {
        $timeout(function() {
            $scope.infoWindow.show = false;
            $timeout(function() {
                $scope.map.center = {
                    latitude: marker.coords.latitude,
                    longitude: marker.coords.longitude
                };

                $scope.infoWindow.coords = marker.coords;
                $scope.infoWindow.show = true;
                $scope.infoWindow.templateParameter = {
                    marker: marker,
                    showMenuCallback: $scope.showMenuModal
                };
            });
        });
    }

    $scope.showMenuModal = function(truckId: string) {
        var marker = _.find(allActiveTruckMarkers, function(marker) {
            return marker.truckProfile.id === truckId;
        });
        var customMenuColors = colorService.getCustomMenuColorsForTruck(marker.truckProfile);
        ModalMenuService.launch(truckId, customMenuColors);

        $analytics.eventTrack('ViewMenu', {
            category: 'Map',
            label: marker.truckProfile.name
        });
    };

    $scope.$watch('searchQuery', function() {
        if ($scope.searchQuery.length === 0 && $scope.displayedMarkers.length < allActiveTruckMarkers.length) {
            $scope.displayedMarkers = allActiveTruckMarkers;

            $analytics.eventTrack('SearchCleared', {
                category: 'Map'
            });
        }
    });

    $scope.simpleSearch = function(query: string) {
        $scope.displayedMarkers = [];
        $scope.loading = true;
        SearchService.simpleSearch(query, 20, 0).then(function(results) {
            var resultTruckIds = _.map(results, function(r) {
                return r.truck.id;
            });
            $scope.displayedMarkers = _.filter(allActiveTruckMarkers, function(marker) {
                return _.contains(resultTruckIds, marker.truckProfile.id);
            });
            $scope.loading = false;
        });

        $analytics.eventTrack('SimpleSearch', {
            category: 'Map',
            label: query
        });
    };

}
mapCtrl.$inject = ['$scope', 'growl', 'colorService', 'SearchService', 'MarkerService', '$timeout', '$analytics', 'ModalMenuService'];
angular.module('TruckMuncherApp').controller('mapCtrl', mapCtrl);