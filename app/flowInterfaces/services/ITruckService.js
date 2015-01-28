declare class ITruckService {
    getTrucksForVendor():any;
    modifyTruckProfile(truckId:?string, name:?string, keywords:?Array<string>, primaryColor:?string, secondaryColor:?string):any;
    getImageUploadUrl(truckId:string):string;
    getActiveTrucks(latitude:number, longitude:number):any;
    getTruckProfiles(latitude:number, longitude:number):any;
}