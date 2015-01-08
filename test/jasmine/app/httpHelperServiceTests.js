describe('httpHelperService', function () {
    var $httpBackend, $http, interceptor, $state, tokenService, growl, service;

    beforeEach(module('TruckMuncherApp'));

    beforeEach(module(function ($urlRouterProvider) {
        $urlRouterProvider.otherwise(function(){return false;});
    }));


    beforeEach(inject(function (_$httpBackend_, _$http_, httpInterceptor, _$state_, TokenService, _growl_, httpHelperService) {
        $httpBackend = _$httpBackend_;
        $http = _$http_;
        interceptor = httpInterceptor;
        $state = _$state_;
        tokenService = TokenService;
        growl = _growl_;
        service = httpHelperService;
    }));

    it('should notify the user of the user message when the api responds with an error', function () {
        var userMessage = 'message';
        spyOn(growl, 'addErrorMessage');

        service.post('/', {});
        $httpBackend.expect('POST', '/', undefined).respond(500, {userMessage: userMessage});
        $httpBackend.flush();

        expect(growl.addErrorMessage).toHaveBeenCalledWith('Error: ' + userMessage);
    });

    it('should show an unknown error notification when there is no user message on the error response', function(){
        spyOn(growl, 'addErrorMessage');

        service.post('/', {});
        $httpBackend.expect('POST', '/', undefined).respond(500, '');
        $httpBackend.flush();

        expect(growl.addErrorMessage).toHaveBeenCalledWith('An unknown error occurred');
    });


});
