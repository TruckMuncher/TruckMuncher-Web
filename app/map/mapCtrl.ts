interface IMapScope extends ng.IScope {
    mapHeight: string;
    loading: boolean;
    searchQuery: string;
    displayedMarkers: Array<ITruckMarker>;
    infoWindow:{show:boolean; templateUrl: string; options:{}; coords:{}; truck:ITruckProfile; templateParameter: {}};
    map:{center:{}; zoom:number};
    currentPositionMarker:{};

    closeInfoWindow();
    onMarkerClicked(clickEvent:any);
    onProfileClicked(marker:ITruckMarker);
    showMenuModal(truckId:string);
    simpleSearch(query:string);
    report();
}


angular.module('TruckMuncherApp').controller('mapCtrl', ['$scope', 'growl', 'colorService', 'SearchService', 'MarkerService', '$timeout', '$analytics', 'ModalService', 'navigator',
    function ($scope:IMapScope, growl:IGrowlService, colorService:IColorService, SearchService:ISearchService, MarkerService:IMarkerService, $timeout:ng.ITimeoutService, $analytics:IAngularticsService, ModalService:IModalService, navigator:Navigator) {
        $scope.mapHeight = screen.height / 1.7 + 'px';
        $scope.loading = true;
        $scope.searchQuery = "";
        var lat = null;
        var lon = null;
        var allActiveTruckMarkers:Array<ITruckMarker> = [];
        $scope.displayedMarkers = [];
        $scope.currentPositionMarker = {};
        $scope.infoWindow = {
            show: false,
            templateUrl: "/partials/map/infoWindow.jade",
            options: {
                pixelOffset: {height: -30, width: 0}
            },
            coords: {},
            templateParameter: {},
            truck: new TruckProfile()
        };

        $scope.map = {
            center: {
                latitude: 43.05,
                longitude: -87.95
            },
            zoom: 13
        };

        getMarkers();

        function getMarkers() {
            $scope.loading = true;
            allActiveTruckMarkers = [];
            MarkerService.getMarkers().then(function (markers) {
                allActiveTruckMarkers = markers;
                $scope.loading = false;
                $scope.displayedMarkers = allActiveTruckMarkers;
                tryAddUserDistanceToMarkers();
            });
        }

        function tryAddUserDistanceToMarkers() {
            if (!lat || allActiveTruckMarkers.length < 1) return;
            $timeout(function(){
                MarkerService.calculateDistanceFromUserForMarkers(allActiveTruckMarkers, {latitude: lat, longitude: lon});
            });
        }

        navigator.geolocation.getCurrentPosition(function (pos) {
            lat = pos.coords.latitude;
            lon = pos.coords.longitude;
            $scope.currentPositionMarker = {
                id: 1,
                icon: '/img/map_marker_green.png',
                coords: {
                    latitude: lat,
                    longitude: lon
                },
                show: false
            };

            $scope.map.center = {latitude: lat, longitude: lon};
            tryAddUserDistanceToMarkers();
        }, function (error) {
            growl.addErrorMessage('Unable to get location: ' + error.message);
        });


        $scope.closeInfoWindow = () => {
            $scope.infoWindow.show = false;
        };

        $scope.onMarkerClicked = (clickEvent) => {
            showMarkerWindow(clickEvent.model);

            $analytics.eventTrack('MarkerClicked', {category: 'Map', label: clickEvent.model.truckProfile.name});
        };

        $scope.onProfileClicked = (marker) => {
            showMarkerWindow(marker);
            $analytics.eventTrack('ProfileClicked', {category: 'Map', label: marker.truckProfile.name});
        };

        function showMarkerWindow(marker) {
            $timeout(function () {
                $scope.infoWindow.show = false;
                $timeout(function () {
                    if ($scope.map.zoom < 16) $scope.map.zoom = 16;
                    $scope.map.center = {latitude: marker.coords.latitude, longitude: marker.coords.longitude};

                    $scope.infoWindow.coords = marker.coords;
                    $scope.infoWindow.show = true;
                    $scope.infoWindow.templateParameter = {marker: marker, showMenuCallback: $scope.showMenuModal};
                });
            });
        }

        $scope.showMenuModal = (truckId) => {
            var marker = _.find(allActiveTruckMarkers, function (marker) {
                return marker.truckProfile.id === truckId;
            });
            var customMenuColors = colorService.getCustomMenuColorsForTruck(marker.truckProfile);
            ModalService.menu(truckId, customMenuColors);

            $analytics.eventTrack('ViewMenu', {category: 'Map', label: marker.truckProfile.name});
        };

        $scope.$watch('searchQuery', function () {
            if ($scope.searchQuery.length === 0 && $scope.displayedMarkers.length < allActiveTruckMarkers.length) {
                $scope.displayedMarkers = allActiveTruckMarkers;

                $analytics.eventTrack('SearchCleared', {category: 'Map'});
            }
        });

        $scope.simpleSearch = (query) => {
            $scope.loading = true;
            SearchService.simpleSearch(query, 100, 0).then(function (results) {
                var resultTruckIds = _.map(results.searchResponse, function (r) {
                    return r.truck.id;
                });
                $scope.displayedMarkers = _.filter(allActiveTruckMarkers, function (marker) {
                    return _.contains(resultTruckIds, marker.truckProfile.id);
                });
                $scope.loading = false;
            }, () => {
                $scope.displayedMarkers = allActiveTruckMarkers;
                $scope.loading = false;
            });

            $analytics.eventTrack('SimpleSearch', {category: 'Map', label: query});
        };


        $scope.report = () => {
            ModalService.reportActiveTruck($scope.map.center);
        }

    }]);

