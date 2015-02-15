interface IVendorMenuScope extends ng.IScope {
    selectedTruck:string;
    menu: IMenu;
    trucks: Array<ITruckProfile>;
    customMenuColors: CustomMenuColors;
    toggleItemAvailability(item:IMenuItem, categoryId:string);
    deleteItem(itemId:string);
    moveItemUp(categoryId:string, index:number);
    moveItemDown(categoryId:string, index:number);
    moveCategoryUp(index:number);
    moveCategoryDown(index:number);
    deleteCategory(categoryId:string);
    addItem(truckId:string, categoryId:string);
}

angular.module('TruckMuncherApp').controller('vendorMenuCtrl', ['$scope', 'MenuService', 'TruckService', '$state', 'confirmDialogService', 'colorService', '$analytics',
    ($scope, MenuService, TruckService, $state, confirmDialog, colorService, $analytics) => new VendorMenuCtrl($scope, MenuService, TruckService, $state, confirmDialog, colorService, $analytics)]);

class VendorMenuCtrl {
    constructor(private $scope:IVendorMenuScope,
                private MenuService:IMenuService,
                private TruckService:ITruckService,
                private $state:ng.ui.IStateService,
                private confirmDialog,
                private colorService:IColorService,
                private $analytics:IAngularticsService) {

        TruckService.getTrucksForVendor().then(function (response) {
            $scope.trucks = _.sortBy(response.trucks || [], function(t){
                return t.name.toLowerCase();
            });
            if ($scope.trucks.length > 0) {
                $scope.selectedTruck = $scope.trucks[0].id;
            }
        });

        $scope.$watch('selectedTruck', function () {
            if ($scope.selectedTruck && (!$scope.menu || $scope.menu.truckId !== $scope.selectedTruck)) {
                setCustomMenuColors($scope.selectedTruck);
                MenuService.getMenu($scope.selectedTruck).then(function (response) {
                    $scope.menu = response.menu;
                });
            }
        });

        function setCustomMenuColors(truckId:string) {
            var temporaryWorkaround:Array<ITruckProfile> = $scope.trucks;
            var truck = _.find(temporaryWorkaround, function (truck) {
                return truck.id === truckId;
            });
            if (truck) {
                $scope.customMenuColors = colorService.getCustomMenuColorsForTruck(truck);
            }
        }

        $scope.toggleItemAvailability = function (item, categoryId) {
            var itemClone = _.clone(item);
            itemClone.isAvailable = !item.isAvailable;
            MenuService.addOrUpdateItem(
                itemClone,
                $scope.selectedTruck,
                categoryId).then(function (response) {
                    $scope.menu = response.menu;
                });
            $analytics.eventTrack('ItemAvailabilityToggle', {category: 'VendorMenu'});
        };

        $scope.deleteItem = function (itemId) {
            var body = 'Are you sure you want to delete this item?';
            confirmDialog.launch(null, 'Delete Item', body, 'Yes', 'No').then(function () {
                MenuService.deleteItem($scope.selectedTruck, itemId).then(function (response) {
                    $scope.menu = response.menu;
                });

                $analytics.eventTrack('ItemDeleted', {category: 'VendorMenu'});
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
                $scope.menu = response.menu;
            });

            $analytics.eventTrack('ItemReordered', {category: 'VendorMenu'});
        }

        function getSortedItems(categoryId):Array<IMenuItem> {
            var tempWorkaround:Array<ICategory> = $scope.menu.categories;
            var category = _.find(tempWorkaround, function (c) {
                return c.id === categoryId;
            });
            return _.sortBy(category.menuItems, function (i) {
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
                $scope.menu = response.menu;
            });

            $analytics.eventTrack('CategoryReordered', {category: 'VendorMenu'});
        }

        function getSortedCategories():Array<ICategory> {
            var tempWorkaround:Array<ICategory> = $scope.menu.categories;
            return _.sortBy(tempWorkaround, function (c) {
                return c.orderInMenu;
            });
        }

        $scope.deleteCategory = function (categoryId) {
            var body = 'Are you sure you want to delete this category? All items in the category will also be deleted.';
            confirmDialog.launch(null, 'Delete Category', body, 'Yes', 'No').then(function () {
                MenuService.deleteCategory($scope.selectedTruck, categoryId).then(function (response) {
                    $scope.menu = response.menu;
                });

                $analytics.eventTrack('CategoryDeleted', {category: 'VendorMenu'});
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
}
