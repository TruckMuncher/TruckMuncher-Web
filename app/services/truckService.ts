interface ITruckService {
    getTrucksForVendor():ng.IPromise<ITruckProfilesResponse>;
    modifyTruckProfile(truckId:string, name:string, keywords:Array<string>, primaryColor:string, secondaryColor:string, description:string, phoneNumber:string):ng.IPromise<ITruckProfile>;
    getImageUploadUrl(truckId:string):string;
    getActiveTrucks():ng.IPromise<IActiveTrucksResponse>;
    requestApproval(truckId:string, email:string):ng.IPromise<{}>;
    checkApprovalStatus(truckId:string):ng.IPromise<IApprovalStatusResponse>;
}

angular.module('TruckMuncherApp').factory('TruckService', ['httpHelperService', 'StateService',
    (httpHelperService, StateService) => new TruckService(httpHelperService, StateService)]);

class TruckService implements ITruckService {
    private milwaukeeLatitude:number = 43.05;
    private milwaukeeLongitude:number = -87.95;

    constructor(private httpHelperService:IHttpHelperService, private StateService: IStateService) {
    }

    getTrucksForVendor():ng.IPromise<ITruckProfilesResponse> {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.trucks.TruckService/getTrucksForVendor';
        return this.httpHelperService.post(url, {});
    }

    modifyTruckProfile(truckId:string, name:string, keywords:Array<string>, primaryColor:string, secondaryColor:string, description:string, phoneNumber:string):ng.IPromise<ITruckProfile> {
        //TODO: Figure out a way to update the state service
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
        ).then((response: ITruckProfile)=> {
                //this is okay for now since there is no way to delete a truck. This won't work if they go ahead and delete this truck right away (if there is ever a delete option)
                this.StateService.setTrucks([response]);
                return response;
            }, (error)=> {
                return error;
            });
    }

    getImageUploadUrl(truckId:string):string {
        return this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.file.FileService/uploadFile/' + truckId;
    }

    getActiveTrucks():ng.IPromise<IActiveTrucksResponse> {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.trucks.TruckService/getActiveTrucks';
        var data = {'latitude': this.milwaukeeLatitude, 'longitude': this.milwaukeeLongitude};
        return this.httpHelperService.post(url, data);
    }

    requestApproval(truckId:string, email:string):ng.IPromise<{}> {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.trucks.TruckService/requestApproval';
        var data = {'truckId': truckId, 'email': email};
        return this.httpHelperService.post(url, data);
    }

    checkApprovalStatus(truckId:string):ng.IPromise<IApprovalStatusResponse> {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.trucks.TruckService/checkApprovalStatus';
        var data = {'truckId': truckId};
        return this.httpHelperService.post(url, data);
    }
}
