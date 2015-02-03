interface ITruckService {
    getTrucksForVendor():any;
    modifyTruckProfile(truckId:string, name:string, keywords:Array<string>, primaryColor:string, secondaryColor:string):any;
    getImageUploadUrl(truckId:string):string;
    getActiveTrucks(latitude:number, longitude:number):any;
    getTruckProfiles(latitude:number, longitude:number):any;
}

angular.module('TruckMuncherApp').factory('TruckService', ['httpHelperService',
    (httpHelperService) => new TruckService(httpHelperService)]);

class TruckService implements ITruckService {
    httpHelperService:IHttpHelperService;

    constructor(httpHelperService:IHttpHelperService) {
        this.httpHelperService = httpHelperService;
    }

    getTrucksForVendor():any {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.trucks.TruckService/getTrucksForVendor';
        return this.httpHelperService.post(url, {}, 'trucks');
    }

    modifyTruckProfile(truckId:string, name:string, keywords:Array<string>, primaryColor:string, secondaryColor:string):any {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.trucks.TruckService/modifyTruckProfile';
        return this.httpHelperService.post(url,
            {
                id: truckId,
                name: name,
                keywords: keywords,
                primaryColor: primaryColor,
                secondaryColor: secondaryColor
            }
        );
    }

    getImageUploadUrl(truckId:string):string {
        return this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.file.FileService/uploadFile/' + truckId;
    }

    getActiveTrucks(latitude:number, longitude:number):any {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.trucks.TruckService/getActiveTrucks';
        var data = {'latitude': latitude, 'longitude': longitude};
        return this.httpHelperService.post(url, data, 'trucks');
    }

    getTruckProfiles(latitude:number, longitude:number):any {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.trucks.TruckService/getTruckProfiles';
        return this.httpHelperService.post(url, {'latitude': latitude, 'longitude': longitude}, 'trucks');
    }

}
