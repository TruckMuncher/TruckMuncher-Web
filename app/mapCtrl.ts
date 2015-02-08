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
}


angular.module('TruckMuncherApp').controller('mapCtrl', ['$scope', 'growl', 'colorService', 'SearchService', 'MarkerService', '$timeout', '$analytics', 'ModalMenuService',
    ($scope, growl, colorService, SearchService, MarkerService, $timeout, $analytics, ModalMenuService) => new MapCtrl($scope, growl, colorService, SearchService, MarkerService, $timeout, $analytics, ModalMenuService)]);

class MapCtrl {
    constructor(private $scope:IMapScope,
                private growl:IGrowlService,
                private colorService:IColorService,
                private SearchService:ISearchService,
                private MarkerService:IMarkerService,
                private $timeout:ng.ITimeoutService,
                private $analytics:IAngularticsService,
                private ModalMenuService:IModalMenuService) {
        $scope.mapHeight = screen.height / 1.7 + 'px';
        $scope.loading = true;
        $scope.searchQuery = "";
        var lat;
        var lon;
        var allActiveTruckMarkers:Array<ITruckMarker> = [];
        $scope.displayedMarkers = [];
        $scope.infoWindow = {
            show: false,
            templateUrl: "/partials/map/infoWindow.jade",
            options: {
                pixelOffset: {height: -20, width: 0}
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
            $scope.loading = true;
            allActiveTruckMarkers = [];
            MarkerService.getMarkers(lat, lon).then(function (markers) {
                allActiveTruckMarkers = markers;
                $scope.loading = false;
                $scope.displayedMarkers = allActiveTruckMarkers;
            });
        }

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
            ModalMenuService.launch(truckId, customMenuColors);

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
            SearchService.simpleSearch(query, 20, 0).then(function (results) {
                var resultTruckIds = _.map(results.searchResponse, function (r) {
                    return r.truck.id;
                });
                $scope.displayedMarkers = _.filter(allActiveTruckMarkers, function (marker) {
                    return _.contains(resultTruckIds, marker.truckProfile.id);
                });
                $scope.loading = false;
            });

            $analytics.eventTrack('SimpleSearch', {category: 'Map', label: query});
        };

    }
}
