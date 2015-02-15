interface IVendorProfileScope extends ng.IScope {
    trucks: Array<ITruckProfile>;
    selectedTruck: ITruckProfile;
    tags: Array<{text:string}>;
    newColorSelection: {primaryColor:string; secondaryColor:string};
    selectingColor: string;
    colorPicker: {color:string};
    requestInProgress: boolean;
    newName: string;
    displayImage: string;

    saveTruck();
    createTruck();
    submit();
    resetTruck();
    setFormValuesFromSelectedTruck();
    selectColor(theColor:string);
    changeProfilePicture();
}

angular.module('TruckMuncherApp').controller('vendorProfileCtrl', ['$scope', 'TruckService', 'growl', '$analytics', 'modalProfileImageService',
    function ($scope:IVendorProfileScope, TruckService:ITruckService, growl:IGrowlService, $analytics:IAngularticsService, modalProfileImageService:IModalProfileImageService) {
        $scope.trucks = [];
        $scope.selectedTruck = new TruckProfile();
        $scope.tags = [];
        $scope.newColorSelection = {primaryColor: undefined, secondaryColor: undefined};
        $scope.selectingColor = null;
        $scope.colorPicker = {color: ""};

        (() => TruckService.getTrucksForVendor().then(function (response) {
            $scope.trucks = _.sortBy(response.trucks, function(t){
                return t.name.toLowerCase();
            });
            if ($scope.trucks.length > 0) {
                $scope.selectedTruck = $scope.trucks[0];
            }
        }))();

        $scope.saveTruck = () => {
            var keywords = _.map($scope.tags, function (tag) {
                return tag.text;
            });

            $scope.requestInProgress = true;
            TruckService.modifyTruckProfile(
                $scope.selectedTruck.id,
                $scope.newName,
                keywords,
                $scope.newColorSelection.primaryColor,
                $scope.newColorSelection.secondaryColor
            ).then(function (response) {
                    $scope.requestInProgress = false;
                    growl.addSuccessMessage('Profile Updated Successfully');
                    refreshTruck(response);
                }, function () {
                    $scope.requestInProgress = false;
                });

            $analytics.eventTrack('TruckUpdated', {category: 'VendorProfile', label: $scope.newName});
        };

        $scope.createTruck = () => {
            $scope.requestInProgress = true;
            TruckService.modifyTruckProfile(null, 'New Truck', null, null, null).then(function (response) {
                $scope.requestInProgress = false;
                growl.addSuccessMessage('Truck Created Successfully');
                $scope.trucks.push(response);
                refreshTruck(response);
            }, function () {
                $scope.requestInProgress = false;
            });

            $analytics.eventTrack('TruckCreated', {category: 'VendorProfile'});
        };

        $scope.submit = () => {
            $scope.saveTruck();
        };

        function refreshTruck(truck:ITruckProfile) {
            var index = _.findIndex($scope.trucks, function (t) {
                return t.id === truck.id;
            });
            if (index >= 0) {
                $scope.trucks[index] = truck;
                $scope.selectedTruck = truck;
            }
        }


        $scope.$watch('selectedTruck', function () {
            $scope.setFormValuesFromSelectedTruck();
            if ($scope.selectedTruck && stripUIDFromImageUrl($scope.displayImage) !== $scope.selectedTruck.imageUrl)
                $scope.displayImage = $scope.selectedTruck.imageUrl;
        });

        $scope.resetTruck = () => {
            $scope.setFormValuesFromSelectedTruck();
        };

        $scope.setFormValuesFromSelectedTruck = () => {
            convertKeywordsToTags();
            if ($scope.selectedTruck) {
                $scope.newName = $scope.selectedTruck.name;
                $scope.newColorSelection.primaryColor = $scope.selectedTruck.primaryColor;
                $scope.newColorSelection.secondaryColor = $scope.selectedTruck.secondaryColor;
            }
            $scope.selectingColor = "primary";
            $scope.selectColor($scope.newColorSelection.primaryColor);
        };

        $scope.selectColor = (theColor) => {
            if (theColor !== $scope.colorPicker.color)
                $scope.colorPicker.color = theColor;
            if ($scope.selectingColor === "primary")
                $scope.newColorSelection.primaryColor = theColor;
            else if ($scope.selectingColor === "secondary")
                $scope.newColorSelection.secondaryColor = theColor;
        };

        $scope.$watch('selectingColor', function () {
            if ($scope.selectingColor === "primary")
                $scope.colorPicker.color = $scope.newColorSelection.primaryColor;
            else if ($scope.selectingColor === "secondary")
                $scope.colorPicker.color = $scope.newColorSelection.secondaryColor;
        });

        function convertKeywordsToTags() {
            $scope.tags = _.map($scope.selectedTruck.keywords, function (keyword) {
                return {text: keyword};
            });
        }

        $scope.changeProfilePicture = function () {
            modalProfileImageService.launch(TruckService.getImageUploadUrl($scope.selectedTruck.id)).then(function (changed) {
                if (changed) {
                    $scope.displayImage = $scope.selectedTruck.imageUrl + '?' + new Date().getTime();
                }
            })
        };

        function stripUIDFromImageUrl(imageUrl) {
            if (imageUrl)return imageUrl.substring(0, imageUrl.lastIndexOf('?'));
            else return "";
        }
    }]);
