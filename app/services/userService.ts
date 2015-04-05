interface IUserService {
    getAccount():ng.IPromise<IUser>;
    linkAccount(postActivity:boolean):ng.IPromise<IUser>;
    unlinkAccounts(twitter:boolean, facebook:boolean):ng.IPromise<IUser>;
    modifyAccount(postToFb:boolean, postToTw:boolean):ng.IPromise<IUser>;
    getFavorites():ng.IPromise<IFavoriteResponse>;
    addFavorite(truckId:string):ng.IPromise<IFavoriteResponse>;
    removeFavorite(truckId:string):ng.IPromise<IFavoriteResponse>;
}

angular.module('TruckMuncherApp').factory('UserService', ['httpHelperService', 'StateService',
    (httpHelperService, StateService) => new UserService(httpHelperService, StateService)]);

class UserService implements IUserService {
    constructor(private httpHelperService:IHttpHelperService, private StateService:IStateService) { }

    getAccount():ng.IPromise<IUser>{
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.user.UserService/getAccount';
        return this.httpHelperService.post(url, {});
    }

    linkAccount(postActivity:boolean):ng.IPromise<IUser> {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.user.UserService/linkAccount';
        return this.httpHelperService.post(url, {postActivity: postActivity});
    }

    unlinkAccounts(twitter:boolean, facebook:boolean):ng.IPromise<IUser> {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.user.UserService/unlinkAccounts';
        return this.httpHelperService.post(url, {twitter: twitter, facebook: facebook});
    }

    modifyAccount(postToFb:boolean, postToTw:boolean):ng.IPromise<IUser> {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.user.UserService/modifyAccount';
        return this.httpHelperService.post(url, {postToFb: postToFb, postToTw: postToTw});
    }

    getFavorites():ng.IPromise<IFavoriteResponse> {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.user.UserService/getFavorites';
        return this.httpHelperService.post(url, {});
    }

    addFavorite(truckId:string):ng.IPromise<IFavoriteResponse> {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.user.UserService/addFavorite';
        return this.httpHelperService.post(url, {truckId: truckId}).then((success: IFavoriteResponse)=> {
            this.StateService.setFavorites(success.favorites);
            return success;
        }, (error)=> {
            return error;
        });
    }

    removeFavorite(truckId:string):ng.IPromise<IFavoriteResponse> {
        var url = this.httpHelperService.getApiUrl() + '/com.truckmuncher.api.user.UserService/removeFavorite';
        return this.httpHelperService.post(url, {truckId: truckId}).then((success: IFavoriteResponse)=> {
            this.StateService.setFavorites(success.favorites);
            return success;
        }, (error)=> {
            return error;
        });
    }
}