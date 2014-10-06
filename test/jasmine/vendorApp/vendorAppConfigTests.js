describe('vendorApp', function () {
    var $httpBackend, $http, interceptor;

    beforeEach(module('vendorApp'));

    beforeEach(inject(function (_$httpBackend_, _$http_, httpInterceptor) {
        $httpBackend = _$httpBackend_;
        $http = _$http_;
        interceptor = httpInterceptor;
    }));

    it('should put the x-timestamp in the header on all requests', function () {
        spyOn(interceptor, 'request').andCallThrough();

        $http({method: 'GET', url: '/'});
        $httpBackend.expect('GET', '/').respond(200, '');
        $httpBackend.flush();

        expect(interceptor.request).toHaveBeenCalled();
    });

});