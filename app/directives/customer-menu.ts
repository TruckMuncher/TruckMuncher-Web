angular.module('TruckMuncherApp').directive('customerMenu', [
    function () {
        return {
            restrict: 'A',
            scope: {customMenuColors: '=', menu: '='},
            replace: true,
            link: function (scope) {
                scope.$watch('menu', function () {
                    if (scope.menu) {
                        scope.menu.show = true;

                        _.forEach(scope.menu.categories, function (category:ICategory) {
                            _.forEach(category.menuItems, function (item:IMenuItem) {
                                item['vegan'] = _.contains(item.tags, "vegan");
                                item['vegetarian'] = _.contains(item.tags, "vegetarian");
                                item['peanuts'] = _.contains(item.tags, "contains peanuts");
                                item['raw'] = _.contains(item.tags, "raw");
                                item['gluten'] = _.contains(item.tags, "gluten free");
                            })
                        })
                    }
                });
                //return
            },
            templateUrl: '/partials/directiveTemplates/customer-menu.jade'
        };
    }]);