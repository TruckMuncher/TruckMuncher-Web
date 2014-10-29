describe('TruckMuncherApp', function () {
    var $httpBackend, $http, interceptor, $state, tokenService;

    beforeEach(module('TruckMuncherApp'));

    beforeEach(inject(function (_$httpBackend_, _$http_, httpInterceptor, _$state_, TokenService) {
        $httpBackend = _$httpBackend_;
        $http = _$http_;
        interceptor = httpInterceptor;
        $state = _$state_;
        tokenService = TokenService;
    }));

    it('should put the x-timestamp in the header on all requests', function () {
        spyOn(interceptor, 'request').andCallThrough();

        $http({method: 'GET', url: '/'});
        $httpBackend.expect('GET', '/').respond(200, '');
        $httpBackend.flush();

        expect(interceptor.request).toHaveBeenCalled();
    });

    it('should redirect to the login page if the user tries to go to a route that requires authentication and is not logged in', function () {
        $state.go('menu');

        $httpBackend.expect('GET', 'partials/login.jade', undefined).respond(200, '');
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should allow the user to get to pages that require authentication when the user is logged in', function () {
        tokenService.setToken('abcdefg');
        $state.go('menu');

        $httpBackend.expect('GET', '/partials/vendors/vendorMenu.jade', undefined).respond(200, '');
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingRequest();
    });

});