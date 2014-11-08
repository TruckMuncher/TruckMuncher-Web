describe('TruckMuncherApp', function () {
    beforeEach(module('TruckMuncherApp'));

    describe('profileImageUploadCtrl', function () {
        var $scope, $q, rootScope;
        var rejectRequests;

        var mockTruckService = {
            getImageUploadUrl: function (id) {
                return 'someUrl/' + id;
            }
        };

        var mockTimestampAndNonceService = {
            getNonce: function () {
                return 'nonce';
            },
            getTimestamp: function () {
                return 'timestamp';
            }
        };

        var mockTokenService = {
            getToken: function () {
                return 'token';
            }
        };

        beforeEach(inject(function ($rootScope, $controller, _$q_) {
            rejectRequests = false;
            $scope = $rootScope.$new();
            rootScope = $rootScope;
            $q = _$q_;

            $controller('profileImageUploadCtrl',
                {
                    $scope: $scope,
                    TruckService: mockTruckService,
                    TimestampAndNonceService: mockTimestampAndNonceService,
                    TokenService: mockTokenService
                });
        }));

        it('should immediately set the headers on the uploader', function () {
            expect($scope.uploader.headers['X-Nonce']).toEqual('nonce');
            expect($scope.uploader.headers['X-Timestamp']).toEqual('timestamp');
            expect($scope.uploader.headers.Authorization).toEqual('session_token=token');
            expect($scope.uploader.headers.Accept).toEqual('application/json');
        });

        it('should change the uploaderUrl when selectedTruckChanged event occurs', function () {
            var selectedTruck = {id: 'abcd'};
            rootScope.$broadcast('selectedTruckChanged', selectedTruck);
            $scope.$apply();

            expect($scope.uploader.url).toEqual('someUrl/' + selectedTruck.id);
        });

        it('should update the displayImage with a timestamp so the ngSrc refreshes when selectedTruckChanged event occurs', function () {
            var selectedTruck = {id: 'abcd', imageUrl: 'www.image'};
            rootScope.$broadcast('selectedTruckChanged', selectedTruck);
            $scope.$apply();

            //ex: www.image?1415465045199
            var re = /www\.image\?\d{13}/;
            var match  = $scope.displayImage.match(re);

            expect(match.length).toEqual(1);
        });
    });
});