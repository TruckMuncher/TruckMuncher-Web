/* @flow */
angular.module('TruckMuncherApp').factory('colorService', function () {
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function isDark(r, g, b) {
        var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq < 128);
    }

    function contrastingHexColor(hex) {
        var light = '#FFFFFF';
        var dark = '#000000';
        var rgb = hexToRgb(hex);
        if (rgb) {
            return isDark(rgb.r, rgb.g, rgb.b) ? light : dark;
        } else {
            return light;
        }
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
        },
        hexColorIsDark: function (hex) {
            var rgb = hexToRgb(hex);
            if (rgb) {
                return isDark(rgb.r, rgb.g, rgb.b);
            } else {
                return false;
            }
        },
        getContrastingHexColor: function (hex) {
            return contrastingHexColor(hex);
        },
        getCustomMenuColorsForTruck: function (truck) {
            var customMenuColors = {
                primary: "#000000",
                secondary: "#000000",
                primaryContrast: "#000000",
                secondaryContrast: "#000000"
            };
            if (!_.isNull(truck.primaryColor) && !_.isUndefined(truck.primaryColor))
                customMenuColors.primary = '#000000';
            if (!_.isNull(truck.secondaryColor) && !_.isUndefined(truck.secondaryColor))
                customMenuColors.secondary = truck.secondaryColor;
            customMenuColors.primaryContrast = contrastingHexColor(customMenuColors.primary);
            customMenuColors.secondaryContrast = contrastingHexColor(customMenuColors.secondary);
            return customMenuColors;
        }
    };
});