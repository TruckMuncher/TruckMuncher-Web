interface IColorService {
    RGBsToHexWithDarkIndicator(rgbArray:Array<Array<number>>): Array < IHexWithDarkIndicator > ;
    hexColorIsDark(hex:string): boolean;
    getContrastingHexColor(hex:string): string;
    getCustomMenuColorsForTruck(truck:ITruckProfile): CustomMenuColors;
}

angular.module('TruckMuncherApp').factory('colorService', [() => new ColorService()]);

class ColorService implements IColorService {
    RGBsToHexWithDarkIndicator(rgbArray:Array<Array<number>>):Array<IHexWithDarkIndicator> {
        var hexArray = _.map(rgbArray, function (val) {
            return ColorService.rgbToHex(val[0], val[1], val[2]);
        });
        var isDarkArray = _.map(rgbArray, function (val) {
            return ColorService.isDark(val[0], val[1], val[2]);
        });

        var pairs = _.zip(hexArray, isDarkArray);

        return _.map(pairs, function (pair) {
            return {'hexColor': pair[0], 'isDark': pair[1]};
        });
    }

    hexColorIsDark(hex:string):boolean {
        var rgb = ColorService.hexToRgb(hex);
        if (rgb) {
            return ColorService.isDark(rgb.r, rgb.g, rgb.b);
        } else {
            return false;
        }
    }

    getContrastingHexColor(hex:string):string {
        return ColorService.contrastingHexColor(hex);
    }

    getCustomMenuColorsForTruck(truck:ITruckProfile):CustomMenuColors {
        var customMenuColors = new CustomMenuColors();
        if (_.isNull(truck.primaryColor) || _.isUndefined(truck.primaryColor))
            customMenuColors.primary = '#000000';
        else
            customMenuColors.primary = truck.primaryColor;
        if (_.isNull(truck.secondaryColor) || _.isUndefined(truck.secondaryColor))
            customMenuColors.secondary = '#000000';
        else
            customMenuColors.secondary = truck.secondaryColor;
        customMenuColors.primaryContrast = ColorService.contrastingHexColor(customMenuColors.primary);
        customMenuColors.secondaryContrast = ColorService.contrastingHexColor(customMenuColors.secondary);
        return customMenuColors;
    }

    private static componentToHex(c:number):string {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    private static rgbToHex(r:number, g:number, b:number):string {
        return "#" + ColorService.componentToHex(r) + ColorService.componentToHex(g) + ColorService.componentToHex(b);
    }

    private static hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    private static isDark(r:number, g:number, b:number):boolean {
        var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq < 128);
    }

    private static contrastingHexColor(hex:string) {
        var light = '#FFFFFF';
        var dark = '#000000';
        var rgb = ColorService.hexToRgb(hex);
        if (rgb) {
            return ColorService.isDark(rgb.r, rgb.g, rgb.b) ? light : dark;
        } else {
            return light;
        }
    }
}
