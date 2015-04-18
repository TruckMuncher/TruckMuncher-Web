angular.module('TruckMuncherApp').directive('truckActiveReport', [
    function () {
        var link = {
            pre: function preLink(scope) {
                scope.mapHeight = screen.height / 2.3 + 'px';

                scope.map = {
                    center: {
                        latitude: scope.mapLat,
                        longitude: scope.mapLon
                    },
                    zoom: 18
                };

                scope.markers = [{
                    id: 2,
                    icon: '/img/map_marker_green.png',
                    coords: scope.map.center,
                    show: false,
                    title: 'Truck Location'
                }];
            }

        };

        return {
            restrict: 'E',
            scope: {mapLat: '@', mapLon: '@'},
            link: link,
            templateUrl: '/partials/directiveTemplates/truck-active-report.jade'
        };
    }]);