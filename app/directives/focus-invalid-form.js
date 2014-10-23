angular.module('TruckMuncherApp').directive('focusInvalidForm', function () {
    var link = function (scope, elem) {
        elem.on('submit', function () {
            var invalidElements = elem.find('.ng-invalid');
            if (invalidElements && invalidElements.length > 0) {
                var firstInvalid = $(invalidElements[0]);
                focusElement(firstInvalid);
            }
        });

        function focusElement(element) {
            if (elementIsChosenSelect(element)) {
                var idOfChosenDivForElement = element.attr("id") + "_chosen";
                $('#' + idOfChosenDivForElement).find(".chosen-single").focus();
            } else {
                element[0].focus();
            }
        }

        function elementIsChosenSelect(element) {
            return element.attr("data-chosen") === "";
        }

    };

    return {
        retrict: 'A',
        link: link
    };
});
