angular.module('TruckMuncherApp').factory('colorService', function () {
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
});