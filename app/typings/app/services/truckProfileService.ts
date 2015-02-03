interface ITruckProfileService {
    updateTruckProfiles(latitude: number, longitude: number): any;
    cookieNeedsUpdate(): boolean;
    allTrucksInStoredProfiles(trucks: Array < ITruckProfile > ): boolean;
    getTruckProfile(truckId: string): ITruckProfile;
}