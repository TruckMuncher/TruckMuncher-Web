interface ITimestampAndNonceService {
    getTimestamp(): string;
    getNonce(): string;
}

angular.module('TruckMuncherApp').factory('TimestampAndNonceService', [()=>new TimestampAndNonceService()]);

class TimestampAndNonceService implements ITimestampAndNonceService {
    private static twoDigitNumber(n) {
        return n < 10 ? '0' + n : '' + n;
    }

    private guid = (function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return function () {
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        };
    })();

    getTimestamp():string {
        var d = new Date(new Date().getTime());
        return d.getUTCFullYear() + '-' +
            TimestampAndNonceService.twoDigitNumber(d.getUTCMonth() + 1) + '-' +
            TimestampAndNonceService.twoDigitNumber(d.getUTCDate()) + 'T' +
            TimestampAndNonceService.twoDigitNumber(d.getUTCHours()) + ':' +
            TimestampAndNonceService.twoDigitNumber(d.getUTCMinutes()) + ':' +
            TimestampAndNonceService.twoDigitNumber(d.getUTCSeconds()) + 'Z';
    }

    getNonce():string {
        var uuid = this.guid();
        var _32randomChars = uuid.replace(/-/gi, '');
        return base64.encode(_32randomChars);
    }

}

