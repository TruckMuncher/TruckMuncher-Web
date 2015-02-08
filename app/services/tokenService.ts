interface ITokenService {
    setToken(token:  string): void;
    getToken(): string;
}

angular.module('TruckMuncherApp').factory('TokenService', [
    () => new TokenService]);

class TokenService implements ITokenService{
    private session_token:string = null;

    setToken(token:string):void {
        this.session_token = token;
    }

    getToken():string {
        return this.session_token;
    }

}
