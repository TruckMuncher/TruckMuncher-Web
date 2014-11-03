angular.module('TruckMuncherApp').controller('vendorMenuCtrl', ['$scope', 'MenuService', 'TruckService', '$state', 'confirmDialogService', 'growl',
    function ($scope, MenuService, TruckService, $state, confirmDialog, growl) {
        $scope.selectedTruck = null;
        $scope.menu = {};

        TruckService.getTrucksForVendor().then(function (response) {
            $scope.trucks = response;
            if ($scope.trucks.length > 0) {
                $scope.selectedTruck = $scope.trucks[0].id;
            }
        });

        $scope.$watch('selectedTruck', function () {
            if ($scope.selectedTruck && $scope.menu.truckId !== $scope.selectedTruck) {
                MenuService.getMenu($scope.selectedTruck).then(function (response) {
                    $scope.menu = response;
                }, function (error) {
                    growl.addErrorMessage('Error: could not retrieve menu for truck');
                });
            }
        });

        $scope.deleteItem = function (itemId) {
            var body = 'Are you sure you want to delete this item?';
            confirmDialog.launch(null, 'Delete Item', body, 'Yes', 'No').then(function () {
                MenuService.deleteItem($scope.selectedTruck, itemId).then(function (response) {
                    $scope.menu = response;
                }, function (error) {
                    growl.addErrorMessage('Error: could not delete item');
                });
            });
        };

        $scope.moveItemDown = function (categoryId, index) {
            moveItem(categoryId, index, 1);
        };

        $scope.moveItemUp = function (categoryId, index) {
            moveItem(categoryId, index, -1);
        };

        function moveItem(categoryId, indexOfItem, swapLocationFromIndex) {
            var sortedItems = getSortedItems(categoryId);
            var theItem = _.clone(sortedItems[indexOfItem]);
            var otherItem = _.clone(sortedItems[indexOfItem + swapLocationFromIndex]);
            theItem.orderInCategory = indexOfItem + swapLocationFromIndex;
            otherItem.orderInCategory = indexOfItem;

            MenuService.addOrUpdateItems([theItem, otherItem], $scope.selectedTruck, categoryId).then(function (response) {
                $scope.menu = response;
            }, function (error) {
                growl.addErrorMessage('Error: could not change item ordering');
            });
        }

        function getSortedItems(categoryId) {
            var category = _.find($scope.menu.categories, function (c) {
                return c.id === categoryId;
            });
            return  _.sortBy(category.menuItems, function (i) {
                return i.orderInCategory;
            });
        }

        $scope.moveCategoryUp = function (index) {
            moveCategory(index, -1);
        };

        $scope.moveCategoryDown = function (index) {
            moveCategory(index, 1);
        };

        function moveCategory(indexOfCategory, swapLocationFromIndex) {
            var sorted = getSortedCategories();
            var theCategory = _.clone(sorted[indexOfCategory]);
            var otherCategory = _.clone(sorted[indexOfCategory + swapLocationFromIndex]);
            theCategory.orderInMenu = indexOfCategory + swapLocationFromIndex;
            otherCategory.orderInMenu = indexOfCategory;

            delete theCategory.menuItems;
            delete otherCategory.menuItems;
            MenuService.addOrUpdateCategories([theCategory, otherCategory], $scope.selectedTruck).then(function (response) {
                $scope.menu = response;
            }, function (error) {
                growl.addErrorMessage('Error: could not change category ordering');
            });
        }

        function getSortedCategories() {
            return _.sortBy($scope.menu.categories, function (c) {
                return c.orderInMenu;
            });
        }

        $scope.deleteCategory = function (categoryId) {
            var body = 'Are you sure you want to delete this category? All items in the category will also be deleted.';
            confirmDialog.launch(null, 'Delete Category', body, 'Yes', 'No').then(function () {
                MenuService.deleteCategory($scope.selectedTruck, categoryId).then(function (response) {
                    $scope.menu = response;
                }, function (error) {
                    growl.addErrorMessage('Error: could not delete category');
                });
            });
        };

        $scope.$on('menuUpdated', function (event, data) {
            $scope.menu = data;
            $scope.selectedTruck = $scope.menu.truckId;
        });

        $scope.addItem = function (truckId, categoryId) {
            $state.go('.addItem', {truckId: truckId, categoryId: categoryId});
        };
    }
]);