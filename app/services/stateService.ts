interface IStateService {
    setToken(token:string): void;
    getToken(): string;
    setFavorites(favorites:Array<string>):void;
    setTrucks(trucks:Array<ITruckProfile>):void;
    isVendor():boolean;
    isFavorite(truckId:string):boolean;
}

angular.module('TruckMuncherApp').factory('StateService', [() => new StateService]);

class StateService implements IStateService {
    private session_token:string = null;
    private favorites:Array<string> = [];
    private trucks:Array<ITruckProfile> = [];

    setFavorites(favorites:Array<string>):void {
        this.favorites = favorites;
    }

    isFavorite(truckId:string):boolean{
        return _.contains(this.favorites, truckId);
    }

    setTrucks(trucks:Array<ITruckProfile>):void {
        this.trucks = trucks;
    }

    isVendor():boolean {
        return this.trucks.length > 0;
    }

    setToken(token:string):void {
        this.session_token = token;
    }

    getToken():string {
        return this.session_token;
    }

}
