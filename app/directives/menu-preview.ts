angular.module('TruckMuncherApp').directive('menuPreview', ['colorService',
    function (colorService:IColorService) {
        var link = function (scope, elem) {
            var canvas = document.createElement('canvas');

            var canvasHeight = 150;
            var canvasWidth = 100;
            canvas.setAttribute('height', canvasHeight);
            canvas.setAttribute('width', canvasWidth);
            var ctx = canvas.getContext('2d');
            var itemOffset = 8;
            var rowHeight = 8;
            var textHeight = rowHeight * .6;
            var textVerticalOffset = rowHeight - (rowHeight - textHeight) / 2;

            elem.append(canvas);

            scope.$watch('primaryColor', function(){
              redrawMenu();
            });

            scope.$watch('secondaryColor', function(){
                redrawMenu();
            });

            function redrawMenu()  {
                ctx.fillStyle = '#EEEEEE';
                ctx.fillRect(0, 0, canvasWidth, canvasHeight);
                drawCategories(0, 3);
            }

            function drawCategories(startY, numberToDraw) {
                var offset = 0;
                for (var i = 1; i <= numberToDraw; i++) {
                    offset += drawCategory(startY + offset) + rowHeight;
                }
            }

            function drawCategory(startY) {
                function drawCategoryHeading(startY) {
                    var secondaryColor = scope.secondaryColor || '#000000';
                    ctx.fillStyle = secondaryColor;
                    ctx.fillRect(0, startY, canvasWidth, rowHeight);
                    ctx.font = (textHeight).toString() + "px Times New Roman";
                    ctx.strokeStyle = colorService.getContrastingHexColor(secondaryColor);
                    ctx.strokeText("Category Heading", 2, startY + textVerticalOffset);
                }

                function drawItemHeading(startY) {
                    var primaryColor = scope.primaryColor || '#000000';
                    ctx.fillStyle = primaryColor;
                    ctx.fillRect(itemOffset, startY, canvasWidth - 2 * itemOffset, rowHeight);
                    ctx.font = (textHeight).toString() + "px Times New Roman";
                    ctx.strokeStyle = colorService.getContrastingHexColor(primaryColor);
                    ctx.strokeText("Item Name", itemOffset + 2, startY + textVerticalOffset);
                }

                function drawItemDetails(startY) {
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillRect(itemOffset, startY, canvasWidth - 2 * itemOffset, rowHeight);
                    ctx.font = (textHeight).toString() + "px Times New Roman";
                    ctx.strokeStyle = '#000000';
                    ctx.strokeText("Item Details", itemOffset + 2, startY + textVerticalOffset);
                }

                drawCategoryHeading(startY);
                var totalHeight = rowHeight * 2;

                for (var i = 1; i <= 3; i++) {
                    var offsetY = startY + 2 * rowHeight * i;
                    drawItemHeading(offsetY);
                    drawItemDetails(offsetY + rowHeight);
                    totalHeight += 2 * rowHeight;
                }

                return totalHeight;
            }
        };

        return {
            restrict: 'A',
            scope: {primaryColor: '=', secondaryColor: '='},
            link: link
        };
    }]);