describe('authHelpers', function () {
    beforeEach(module('TruckMuncherApp', function ($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
    }));

    describe('TimestampAndNonceService', function () {
        var service;

        beforeEach(inject(function (TimestampAndNonceService) {
            service = TimestampAndNonceService;
        }));

        describe('getTimestamp', function () {
            it('should return a time in the format yyyy-mm-ddT##:##:##Z', function () {
                var actual = service.getTimestamp();
                var regexPattern = new RegExp('^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$');

                expect(regexPattern.test(actual)).toBe(true, 'Date not in correct format: ' + actual);
            });
        });

        describe('getNonce', function () {
            it('return an encoded 32 byte thingy', function () {
                var actual = service.getNonce();

                expect(base64.decode(actual).length).toBe(32);
            });
        });
    });

    describe('httpInterceptor', function () {
        var $httpBackend, $http, TokenService, $location;

        beforeEach(inject(function (_$httpBackend_, _$http_, _TokenService_, _$location_) {
            $httpBackend = _$httpBackend_;
            $http = _$http_;
            TokenService = _TokenService_;
            $location = _$location_;
        }));

        it('should put the x-nonce in the header on all requests', function () {
            $http({method: 'GET', url: '/'});

            $httpBackend.expect('GET', '/', undefined, function (headers) {
                return headers['X-Nonce'];
            }).respond(200, '');

            $httpBackend.flush();
        });

        it('should put the x-timestamp in the header on all requests', function () {
            $http({method: 'GET', url: '/'});

            $httpBackend.expect('GET', '/', undefined, function (headers) {
                return headers['X-Timestamp'];
            }).respond(200, '');

            $httpBackend.flush();
        });

        it('should put the put Facebook token in the Authentication header when available', function () {
            TokenService.setFacebook('token');

            $http({method: 'GET', url: '/'});

            $httpBackend.expect('GET', '/', undefined, function (headers) {
                return headers.Authorization === 'access_token=token';
            }).respond(200, '');

            $httpBackend.flush();
        });

        it('should put the put Twitter tokens in the Authentication header when available', function () {
            TokenService.setTwitter('token1', 'token2');

            $http({method: 'GET', url: '/'});

            $httpBackend.expect('GET', '/', undefined, function (headers) {
                return headers.Authorization === 'oauth_token=token1, oauth_secret=token2';
            }).respond(200, '');

            $httpBackend.flush();
        });

        it('should accept json in the header', function () {
            $http({method: 'GET', url: '/'});

            $httpBackend.expect('GET', '/', undefined, function (headers) {
                return headers.Accept === 'application/json';
            }).respond(200, '');

            $httpBackend.flush();
        });

        it('should have content type of json in the header', function () {
            $http({method: 'POST', data: {'abc': 'def'}, url: '/'});

            $httpBackend.expect('POST', '/', undefined, function (headers) {
                return headers['Content-Type'] === 'application/json';
            }).respond(200, '');

            $httpBackend.flush();
        });

        it('should send the user to the login page when getting a 401', function () {
            $http({method: 'POST', data: {'abc': 'def'}, url: '/'});

            $httpBackend.expect('POST', '/', undefined).respond(401, '');
            $httpBackend.expect('GET', 'partials/login.jade', undefined).respond(200, '');
            $httpBackend.flush();

            expect($location.path()).toBe('/login');
        });
    });
});