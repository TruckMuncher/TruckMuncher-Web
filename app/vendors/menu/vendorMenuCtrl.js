/* @flow */
function vendorMenuCtrl($scope, MenuService: IMenuService, TruckService: ITruckService, $state, confirmDialog, colorService: IColorService, $analytics) {
    $scope.selectedTruck = null;
    $scope.menu = {};

    TruckService.getTrucksForVendor().then(function(response: Array<ITruckProfile>) {
        $scope.trucks = response;
        if (response.length > 0) {
            $scope.selectedTruck = response[0].id;
        }
    });

    $scope.$watch('selectedTruck', function() {
        if ($scope.selectedTruck && $scope.menu.truckId !== $scope.selectedTruck) {
            setCustomMenuColors($scope.selectedTruck);
            MenuService.getMenu($scope.selectedTruck).then(function(response) {
                $scope.menu = response;
            });
        }
    });

    function setCustomMenuColors(truckId: string) {
        var truck = _.find($scope.trucks, function(truck) {
            return truck.id === truckId;
        });
        if (truck) {
            $scope.customMenuColors = colorService.getCustomMenuColorsForTruck(truck);
        }
    }

    $scope.toggleItemAvailability = function(item: IMenuItem, categoryId: string) {
        var itemClone = _.clone(item);
        itemClone.isAvailable = !item.isAvailable;
        MenuService.addOrUpdateItem(
            itemClone,
            $scope.selectedTruck,
            categoryId).then(function(response) {
            $scope.menu = response;
        });
        $analytics.eventTrack('ItemAvailabilityToggle', {
            category: 'VendorMenu'
        });
    };

    $scope.deleteItem = function(itemId: string) {
        var body = 'Are you sure you want to delete this item?';
        confirmDialog.launch(null, 'Delete Item', body, 'Yes', 'No').then(function() {
            MenuService.deleteItem($scope.selectedTruck, itemId).then(function(response: IMenu) {
                $scope.menu = response;
            });

            $analytics.eventTrack('ItemDeleted', {
                category: 'VendorMenu'
            });
        });
    };

    $scope.moveItemDown = function(categoryId: string, index: number) {
        moveItem(categoryId, index, 1);
    };

    $scope.moveItemUp = function(categoryId: string, index: number) {
        moveItem(categoryId, index, -1);
    };

    function moveItem(categoryId: string, indexOfItem: number, swapLocationFromIndex: number) {
        var sortedItems = getSortedItems(categoryId);
        var theItem = _.clone(sortedItems[indexOfItem]);
        var otherItem = _.clone(sortedItems[indexOfItem + swapLocationFromIndex]);
        theItem.orderInCategory = indexOfItem + swapLocationFromIndex;
        otherItem.orderInCategory = indexOfItem;

        MenuService.addOrUpdateItems([theItem, otherItem], $scope.selectedTruck, categoryId).then(function(response) {
            $scope.menu = response;
        });

        $analytics.eventTrack('ItemReordered', {
            category: 'VendorMenu'
        });
    }

    function getSortedItems(categoryId: string): Array < IMenuItem > {
        var category = _.find($scope.menu.categories, function(c) {
            return c.id === categoryId;
        });
        return _.sortBy(category.menuItems, function(i) {
            return i.orderInCategory;
        });
    }

    $scope.moveCategoryUp = function(index: number) {
        moveCategory(index, -1);
    };

    $scope.moveCategoryDown = function(index: number) {
        moveCategory(index, 1);
    };

    function moveCategory(indexOfCategory: number, swapLocationFromIndex: number) {
        var sorted = getSortedCategories();
        var theCategory = _.clone(sorted[indexOfCategory]);
        var otherCategory = _.clone(sorted[indexOfCategory + swapLocationFromIndex]);
        theCategory.orderInMenu = indexOfCategory + swapLocationFromIndex;
        otherCategory.orderInMenu = indexOfCategory;

        delete theCategory.menuItems;
        delete otherCategory.menuItems;
        MenuService.addOrUpdateCategories([theCategory, otherCategory], $scope.selectedTruck).then(function(response: IMenu) {
            $scope.menu = response;
        });

        $analytics.eventTrack('CategoryReordered', {
            category: 'VendorMenu'
        });
    }

    function getSortedCategories(): Array < ICategory > {
        return _.sortBy($scope.menu.categories, function(c) {
            return c.orderInMenu;
        });
    }

    $scope.deleteCategory = function(categoryId: string) {
        var body = 'Are you sure you want to delete this category? All items in the category will also be deleted.';
        confirmDialog.launch(null, 'Delete Category', body, 'Yes', 'No').then(function() {
            MenuService.deleteCategory($scope.selectedTruck, categoryId).then(function(response: IMenu) {
                $scope.menu = response;
            });

            $analytics.eventTrack('CategoryDeleted', {
                category: 'VendorMenu'
            });
        });
    };

    $scope.$on('menuUpdated', function(event, data) {
        $scope.menu = data;
        $scope.selectedTruck = $scope.menu.truckId;
    });

    $scope.addItem = function(truckId:string, categoryId:string) {
        $state.go('.addItem', {
            truckId: truckId,
            categoryId: categoryId
        });
    };
}
vendorMenuCtrl.$inject = ['$scope', 'MenuService', 'TruckService', '$state', 'confirmDialogService', 'colorService', '$analytics'];
angular.module('TruckMuncherApp').controller('vendorMenuCtrl', vendorMenuCtrl);