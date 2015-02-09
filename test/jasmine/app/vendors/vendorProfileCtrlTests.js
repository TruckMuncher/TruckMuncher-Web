describe('TruckMuncherApp', function () {
    beforeEach(module('TruckMuncherApp'));

    beforeEach(module(function ($urlRouterProvider) {
        $urlRouterProvider.otherwise(function(){return false;});
    }));

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
                    deferred.resolve({trucks:[]});
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
            spyOn(TruckServiceMock, 'getTrucksForVendor').and.callThrough();
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
            $scope.tags = [
                {text: 'abc'},
                {text: 'def'},
                {text: 'ghi'}
            ];
            spyOn(TruckServiceMock, 'modifyTruckProfile').and.callThrough();
            $scope.saveTruck();
            $scope.$apply();
            expect(TruckServiceMock.modifyTruckProfile).toHaveBeenCalledWith(undefined, undefined, ['abc', 'def', 'ghi'], undefined, undefined);
        });

        it('should save the truck with the selectedTruck id', function () {
            $scope.selectedTruck = {id: 'a'};
            spyOn(TruckServiceMock, 'modifyTruckProfile').and.callThrough();
            $scope.saveTruck();
            $scope.$apply();
            expect(TruckServiceMock.modifyTruckProfile).toHaveBeenCalledWith('a', undefined, [], undefined, undefined);
        });

        it('should save the truck with the new name', function () {
            $scope.newName = 'newName';
            spyOn(TruckServiceMock, 'modifyTruckProfile').and.callThrough();
            $scope.saveTruck();
            $scope.$apply();
            expect(TruckServiceMock.modifyTruckProfile).toHaveBeenCalledWith(undefined, 'newName', [], undefined, undefined);
        });

        it('should save the truck color selections', function () {
            $scope.newColorSelection.primaryColor = "#fff";
            $scope.newColorSelection.secondaryColor = "#000";

            spyOn(TruckServiceMock, 'modifyTruckProfile').and.callThrough();
            $scope.saveTruck();
            $scope.$apply();
            expect(TruckServiceMock.modifyTruckProfile).toHaveBeenCalledWith(undefined, undefined, [], "#fff", "#000");
        });

        it('should update the correct truck in the trucks Array when saving the profile is successful and set selectedTruck', function () {
            $scope.$apply();
            $scope.trucks = [
                {id: '1', name: 'name'},
                {id: '2', name: 'name'},
                {id: '3', name: 'name'}
            ];
            modifyTruckResponse = {id: '2', name: 'newName'};
            spyOn(TruckServiceMock, 'modifyTruckProfile').and.callThrough();

            $scope.saveTruck();
            $scope.$apply();

            expect($scope.trucks[1].name).toEqual(modifyTruckResponse.name);
            expect($scope.selectedTruck).toEqual(modifyTruckResponse);
        });

        it('should change back to the original name when reset', function () {
            $scope.selectedTruck = {name: 'somethingOld'};
            $scope.resetTruck();
            expect($scope.newName).toEqual('somethingOld');
        });

        it('should change back to the original  colors when reset', function () {
            $scope.selectedTruck = {primaryColor: '#f1234', secondaryColor: '#ccc'};
            $scope.resetTruck();
            expect($scope.newColorSelection.primaryColor).toEqual('#f1234');
            expect($scope.newColorSelection.secondaryColor).toEqual('#ccc');
        });

        it('should change back to the original tags when the truck is reset', function () {
            $scope.selectedTruck = {keywords: ['old1', 'old2', 'old3']};
            $scope.tags = [{text: 'new1'}];

            $scope.resetTruck();

            expect($scope.tags).toEqual([{text: 'old1'}, {text: 'old2'}, {text: 'old3'}]);
        });

        it('should set the colorPicker to the correct color when changing which color is being selected', function () {
            $scope.selectingColor = "primary";
            $scope.$apply();
            $scope.newColorSelection.primaryColor = "#ccc";
            $scope.newColorSelection.secondaryColor = "#fff";

            $scope.selectingColor = "secondary";
            $scope.$apply();
            expect($scope.colorPicker.color).toEqual("#fff");

            $scope.selectingColor = "primary";
            $scope.$apply();
            expect($scope.colorPicker.color).toEqual("#ccc");
        });

        it('should set the correct new color selection when a color is selected', function () {
            $scope.selectingColor = "primary";
            $scope.selectColor('#abc');
            expect($scope.newColorSelection.primaryColor).toEqual('#abc');

            $scope.selectingColor = "secondary";
            $scope.selectColor('#ccc');
            expect($scope.newColorSelection.secondaryColor).toEqual('#ccc');
        });

        it('should set the colorPickers color when a color is selected', function () {
            $scope.selectColor('#ccc');
            expect($scope.colorPicker.color).toEqual('#ccc');
        });

        it('should set the selectingColor to primary when resetting the truck', function () {
            $scope.selectingColor = "secondary";

            $scope.resetTruck();

            expect($scope.selectingColor).toEqual("primary");
        });

        it('should set the new color selections to be the truck\'s original colors when resetting the truck', function () {
            $scope.selectedTruck = {primaryColor: '#abc', secondaryColor: '#def'};
            $scope.$apply();

            $scope.newColorSelection = {};
            $scope.resetTruck();

            expect($scope.newColorSelection.primaryColor).toEqual('#abc');
            expect($scope.newColorSelection.secondaryColor).toEqual('#def');
        });

    });
});