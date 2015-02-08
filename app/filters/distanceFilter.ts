angular.module('TruckMuncherApp').filter('distance', [function () {
    return function (meters:number, unit:string) {
        if (unit === 'miles') {
            return meters * 0.00062137;
        } else if (unit === 'kilometers') {
            return meters * .001;
        } else if (unit === 'nauticals') {
            return meters * .0005399568;
        } else {
            return meters;
        }
    };
}]);