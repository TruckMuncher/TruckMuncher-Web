declare class IColorService {
	RGBsToHexWithDarkIndicator(rgbArray: Array<any> ): Array < HexWithDarkIndicator > ;
	hexColorIsDark(hex: string): boolean;
	getContrastingHexColor(hex: string): string;
	getCustomMenuColorsForTruck(truck: ITruckProfile): CustomMenuColors;
}