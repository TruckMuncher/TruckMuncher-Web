angular.module('TruckMuncherApp').filter('search', [function () {
    return function (items, field, regex) {
        var patt = new RegExp(regex, 'i');
        return _.filter(items, function (item) {
            var match = false;
            for (var property in item) {
                if (item.hasOwnProperty(property) && patt.test(item[property])) {
                    match = true;
                }
            }
            return match;
        });
    };
}]);