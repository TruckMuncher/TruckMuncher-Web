describe('TruckMuncherApp', function () {
    beforeEach(module('TruckMuncherApp'));

    describe('vendorProfileCtrl', function () {
        var $scope, $q;
        var rejectRequests;
        var createCtrlFn;
        var modifyTruckResponse;

        var growlMock = {
            addErrorMessage: function () {
            },
            addSuccessMessage: function () {
            }
        };

        var TruckServiceMock = {
            modifyTruckProfile: function () {
                var deferred = $q.defer();
                if (rejectRequests) {
                    deferred.reject({});
                } else {
                    deferred.resolve(modifyTruckResponse);
                }
                return deferred.promise;
            },
            getTrucksForVendor: function () {
                var deferred = $q.defer();
                if (rejectRequests) {
                    deferred.reject({});
                } else {
                    deferred.resolve({});
                }
                return deferred.promise;
            }
        };

        beforeEach(inject(function ($rootScope, $controller, _$q_) {
            rejectRequests = false;
            $scope = $rootScope.$new();
            $q = _$q_;

            createCtrlFn = function () {
                $controller('vendorProfileCtrl', {
                    $scope: $scope,
                    growl: growlMock,
                    TruckService: TruckServiceMock
                });
            };
            createCtrlFn();
        }));

        it('should get the trucks for vendor when the controller loads', function () {
            spyOn(TruckServiceMock, 'getTrucksForVendor').andCallThrough();
            createCtrlFn();
            expect(TruckServiceMock.getTrucksForVendor).toHaveBeenCalled();
        });

        it('should convert the keywords on the selectedTruck to tags', function () {
            $scope.selectedTruck = {keywords: ['abc', 'def', 'ghi']};
            $scope.$apply();
            expect($scope.tags).toEqual([
                {text: 'abc'},
                {text: 'def'},
                {text: 'ghi'}
            ]);
        });

        it('should convert the tags to keywords when submitting', function () {
            $scope.selectedTruck = {id: 'a', imageUrl: 'b', name: 'c'};
            $scope.tags = [
                {text: 'abc'},
                {text: 'def'},
                {text: 'ghi'}
            ];
            spyOn(TruckServiceMock, 'modifyTruckProfile').andCallThrough();
            $scope.saveTruck();
            $scope.$apply();
            expect(TruckServiceMock.modifyTruckProfile).toHaveBeenCalledWith('a', 'c', 'b', ['abc', 'def', 'ghi']);
        });

        it('should update the correct truck in the trucks Array when saving the profile is successful and set selectedTruck', function () {
            $scope.$apply();
            $scope.trucks = [
                {id: '1', name: 'name'},
                {id: '2', name: 'name'},
                {id: '3', name: 'name'}
            ];
            modifyTruckResponse = {id: '2', name: 'newName'};
            spyOn(TruckServiceMock, 'modifyTruckProfile').andCallThrough();

            $scope.saveTruck();
            $scope.$apply();

            expect($scope.trucks[1].name).toEqual(modifyTruckResponse.name);
            expect($scope.selectedTruck).toEqual(modifyTruckResponse);
        });

        it('should change back to the original name when reset', function () {
            $scope.selectedTruck = {newName: 'somethingNew', name: 'somethingOld'};
            $scope.resetTruck();
            expect($scope.selectedTruck.newName).toEqual('somethingOld');
        });

        it('should change back to the original tags when the truck is reset', function () {
            $scope.selectedTruck = {keywords: ['old1', 'old2', 'old3']};
            $scope.tags = [{text: 'new1'}];

            $scope.resetTruck();

            expect($scope.tags).toEqual([{ text : 'old1' }, { text : 'old2' }, { text : 'old3' }]);
        });

    });
});