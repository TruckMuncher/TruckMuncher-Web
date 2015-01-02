describe('TruckMuncherApp', function () {
    var mockTruckService = {
        getImageUploadUrl: function (id) {
            return 'someUrl/' + id;
        }
    };

    var mockTimestampAndNonceService = {
        getNonce: sinon.stub().returns('nonce'),
        getTimestamp: sinon.stub().returns('timestamp')
    };

    var mockTokenService = {
        getToken: sinon.stub().returns('token')
    };

    beforeEach(module('TruckMuncherApp', function ($provide) {
        $provide.value('TokenService', mockTokenService);
        $provide.value('TimestampAndNonceService', mockTimestampAndNonceService);
        $provide.value('TruckService', mockTruckService);
    }));

    beforeEach(module('/partials/directiveTemplates/profile-image-upload.jade'));

    describe('profile-image-upload', function () {
        var scope, element;

        beforeEach(inject(function ($compile, $rootScope) {
            element = angular.element("<div data-profile-image-upload='' data-truck='{id: 1}'></div>");
            $compile(element)($rootScope);
            $rootScope.$apply();
            scope = element.isolateScope();
        }));

        it('should immediately set the headers on the uploader', function () {
            expect(scope.uploader.headers['X-Nonce']).toEqual('nonce');
            expect(scope.uploader.headers['X-Timestamp']).toEqual('timestamp');
            expect(scope.uploader.headers.Authorization).toEqual('session_token=token');
            expect(scope.uploader.headers.Accept).toEqual('application/json');
        });

        it('should change the uploaderUrl when truck changes', function () {
            scope.truck = {id: 'abcd'};
            scope.$apply();

            expect(scope.uploader.url).toEqual('someUrl/' + scope.truck.id);
        });

        it('should update the displayImage with a timestamp so the ngSrc refreshes when selectedTruckChanged event occurs', function () {
            scope.truck = {id: 'abcd', imageUrl: 'www.image'};
            scope.$apply();

            //ex: www.image?1415465045199
            var re = /www\.image\?\d{13}/;
            var match = scope.displayImage.match(re);

            expect(match.length).toEqual(1);
        });
    });
});