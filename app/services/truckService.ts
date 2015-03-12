interface ITruckService {
    getTrucksForVendor():ng.IPromise<ITruckProfilesResponse>;
    modifyTruckProfile(truckId:string, name:string, keywords:Array<string>, primaryColor:string, secondaryColor:string, description:string, phoneNumber:string):ng.IPromise<ITruckProfile>;
    getImageUploadUrl(truckId:string):string;
    getActiveTrucks():ng.IPromise<IActiveTrucksResponse>;
    requestApproval(truckId: string, email:string):ng.IPromise<void>;
}

angular.module('TruckMuncherApp').factory('TruckService', ['httpHelperService',
    (httpHelperService) => new TruckService(httpHelperService)]);

class TruckService implements ITruckService {
    private milwaukeeLatitude:number = 43.05;
    private milwaukeeLongitude:number = -87.95;

    constructor(private httpHelperService:IHttpHelperService) {
    }

    getTrucksForVendor():ng.IPromise<ITruckProfilesResponse> {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.trucks.TruckService/getTrucksForVendor';
        return this.httpHelperService.post(url, {});
    }

    modifyTruckProfile(truckId:string, name:string, keywords:Array<string>, primaryColor:string, secondaryColor:string, description:string, phoneNumber:string):ng.IPromise<ITruckProfile> {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.trucks.TruckService/modifyTruckProfile';
        return this.httpHelperService.post(url,
            {
                id: truckId,
                name: name,
                keywords: keywords,
                primaryColor: primaryColor,
                secondaryColor: secondaryColor,
                description: description,
                phoneNumber: phoneNumber
            }
        );
    }

    getImageUploadUrl(truckId:string):string {
        return this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.file.FileService/uploadFile/' + truckId;
    }

    getActiveTrucks():ng.IPromise<IActiveTrucksResponse> {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.trucks.TruckService/getActiveTrucks';
        var data = {'latitude': this.milwaukeeLatitude, 'longitude': this.milwaukeeLongitude};
        return this.httpHelperService.post(url, data);
    }

    requestApproval(truckId:string, email:string):ng.IPromise<void>{
        var url  =this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.trucks.TruckService/approvalRequest';
        var data = {'truckId': truckId, 'email': email};
        return this.httpHelperService.post(url, data);
    }

}
