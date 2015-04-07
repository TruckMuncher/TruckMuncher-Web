describe('authHelpers', function () {
    beforeEach(module('TruckMuncherApp', function ($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
    }));

    beforeEach(module(function ($urlRouterProvider) {
        $urlRouterProvider.otherwise(function () {return false;});
    }));

    describe('httpInterceptor', function () {
        var $httpBackend, $http, StateService, $location;

        beforeEach(inject(function (_$httpBackend_, _$http_, _StateService_, _$location_) {
            $httpBackend = _$httpBackend_;
            $http = _$http_;
            StateService = _StateService_;
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

        it('should put the put token in the Authentication header when available', function () {
            StateService.setToken('token');

            $http({method: 'GET', url: '/'});

            $httpBackend.expect('GET', '/', undefined, function (headers) {
                return headers.Authorization === 'session_token=token';
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
            $httpBackend.expect('GET', '/partials/login.jade', undefined).respond(200, '');
            $httpBackend.flush();

            expect($location.path()).toBe('/login');
        });

        it('should set the token to nothing, clear favorites, and clear trucks when getting a 401', function () {
            $http({method: 'POST', data: {'abc': 'def'}, url: '/'});
            spyOn(StateService,'setToken');
            spyOn(StateService,'setFavorites');
            spyOn(StateService,'setTrucks');

            $httpBackend.expect('POST', '/', undefined).respond(401, '');
            $httpBackend.expect('GET', '/partials/login.jade', undefined).respond(200, '');
            $httpBackend.flush();

            expect(StateService.setToken).toHaveBeenCalledWith(null);
            expect(StateService.setFavorites).toHaveBeenCalledWith([]);
            expect(StateService.setTrucks).toHaveBeenCalledWith([]);
        });
    });
});
