declare class ITruckService {
    getTrucksForVendor():any;
    modifyTruckProfile(truckId:?string, name:?string, keywords:?Array<string>, primaryColor:?string, secondaryColor:?string):any;
    getImageUploadUrl(truckId:string):string;
    getActiveTrucks(latitude:string, longitude:string):any;
    getTruckProfiles(latitude:string, longitude:string):any;
}