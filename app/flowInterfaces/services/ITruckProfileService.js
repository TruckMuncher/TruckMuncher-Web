declare class ITruckProfileService {
	updateTruckProfiles(latitude: number, longitude: number): any;
	cookieNeedsUpdate(): boolean;
	allTrucksInStoredProfiles(trucks: Array < TruckProfile > ): boolean;
	getTruckProfile(truckId: string): TruckProfile;
}