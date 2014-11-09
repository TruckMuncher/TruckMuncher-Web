angular.module('TruckMuncherApp').directive('remoteImageAnalyzer', ['$rootScope', 'colorThief', '$timeout', 'colorService',
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
        };

        return {
            restrict: 'A',
            link: link,
            replace: true,
            scope: {imageUrl: '='},
            templateUrl: '/partials/directiveTemplates/remote-image-analyzer.jade'
        }
    }]);