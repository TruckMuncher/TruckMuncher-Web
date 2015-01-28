/* @flow */
angular.module('TruckMuncherApp').factory('TimestampAndNonceService', function() {
    function twoDigitNumber(n) {
        return n < 10 ? '0' + n : '' + n;
    }

    var guid = (function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return function() {
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        };
    })();

    var service:ITimestampAndNonceService = {
        getTimestamp: function() {
            var d = new Date(new Date().getTime());
            return d.getUTCFullYear() + '-' +
                twoDigitNumber(d.getUTCMonth() + 1) + '-' +
                twoDigitNumber(d.getUTCDate()) + 'T' +
                twoDigitNumber(d.getUTCHours()) + ':' +
                twoDigitNumber(d.getUTCMinutes()) + ':' +
                twoDigitNumber(d.getUTCSeconds()) + 'Z';
        },
        getNonce: function() {
            var uuid = guid();
            var _32randomChars = uuid.replace(/-/gi, '');
            return base64.encode(_32randomChars);
        }
    };

    return service;
});