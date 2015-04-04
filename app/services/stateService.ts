interface IStateService {
    setToken(token:string): void;
    getToken(): string;
    setFavorites(favorites:Array<string>):void;
    setTrucks(trucks:Array<string>):void;
    isVendor():boolean;
}

angular.module('TruckMuncherApp').factory('StateService', [() => new StateService]);

class StateService implements IStateService {
    private session_token:string = null;
    private favorites:Array<string> = [];
    private trucks:Array<string> = [];

    setFavorites(favorites:Array<string>):void {
        this.favorites = favorites;
    }

    setTrucks(trucks:Array<string>):void {
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
