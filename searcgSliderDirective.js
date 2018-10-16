app.directive('sliderRange', ['$document', function ($document) {

    var moveHandle = function (handle, elem, posX) {
        $(elem).find('.handle.' + handle).css("left", posX + '%');
    };
    var moveRange = function (elem, posMin, posMax) {
        $(elem).find('.range').css("left", posMin + '%');
        $(elem).find('.range').css("width", posMax - posMin + '%');
    };

    return {
        template: '<div class="slider horizontal">' +
            '<div class="range"></div>' +
            '<a class="handle min" ng-mousedown="mouseDownMin($event)"></a>' +
            '<a class="handle max" ng-mousedown="mouseDownMax($event)"></a>' +
            '<span class="spanhandle minspan">0</span>' + '<span class="spanhandle maxspan">10000</span>' +
            '</div>',
        replace: true,
        restrict: 'E',
        scope: {
            valueMin: "=",
            valueMax: "="
        },
        link: function postLink(scope, element, attrs) {
            var dragging = false;
            var startPointXMin = 0;
            var startPointXMax = 0;
            var xPosMin = 0;
            var xPosMax = 0;
            var settings = {
                "min": (typeof (attrs.min) !== "undefined" ? parseInt(attrs.min, 10) : 0),
                "max": (typeof (attrs.max) !== "undefined" ? parseInt(attrs.max, 10) : 100),
                "step": (typeof (attrs.step) !== "undefined" ? parseInt(attrs.step, 10) : 1)
            };
            if (typeof (scope.valueMin) == "undefined" || scope.valueMin === '')
                scope.valueMin = settings.min;

            if (typeof (scope.valueMax) == "undefined" || scope.valueMax === '')
                scope.valueMax = settings.max;

            scope.$watch('valueMin', function () {
                if (dragging) return;
                xPosMin = (scope.valueMin - settings.min) / (settings.max - settings.min) * 100;
                if (xPosMin < 0) {
                    xPosMin = 0;
                } else if (xPosMin > 100) {
                    xPosMin = 100;
                }
                moveHandle("min", element, xPosMin);
                moveRange(element, xPosMin, xPosMax);
            });

            scope.$watch('valueMax', function () {
                if (dragging) return;
                xPosMax = (scope.valueMax - settings.min) / (settings.max - settings.min) * 100;
                if (xPosMax < 0) {
                    xPosMax = 0;
                } else if (xPosMax > 100) {
                    xPosMax = 100;
                }
                moveHandle("max", element, xPosMax);
                moveRange(element, xPosMin, xPosMax);
            });

            scope.mouseDownMin = function ($event) {
                dragging = true;
                startPointXMin = $event.pageX;
                $document.on('mousemove', function ($event) {
                    if (!dragging) return;

                    var moveDelta = $event.pageX - startPointXMin;

                    xPosMin = xPosMin + ((moveDelta / element.outerWidth()) * 100);
                    if (xPosMin < 0) {
                        xPosMin = 0;
                    } else if (xPosMin > xPosMax) {
                        xPosMin = xPosMax;
                    } else {
                        startPointXMin = $event.pageX;
                    }
                    scope.valueMin = Math.round((((settings.max - settings.min) * (xPosMin / 100)) + settings.min) / settings.step) * settings.step;
                    scope.$apply();
                    moveHandle("min", element, xPosMin);
                    moveRange(element, xPosMin, xPosMax);
                });
                $document.mouseup(function () {
                    dragging = false;
                    $document.unbind('mousemove');
                    $document.unbind('mousemove');
                });
            };

            scope.mouseDownMax = function ($event) {
                dragging = true;
                startPointXMax = $event.pageX;
                $document.on('mousemove', function ($event) {
                    if (!dragging) return;

                    var moveDelta = $event.pageX - startPointXMax;

                    xPosMax = xPosMax + ((moveDelta / element.outerWidth()) * 100);
                    if (xPosMax > 100) {
                        xPosMax = 100;
                    } else if (xPosMax < xPosMin) {
                        xPosMax = xPosMin;
                    } else {

                        startPointXMax = $event.pageX;
                    }
                    scope.valueMax = Math.round((((settings.max - settings.min) * (xPosMax / 100)) + settings.min) / settings.step) * settings.step;
                    scope.$apply();

                    moveHandle("max", element, xPosMax);
                    moveRange(element, xPosMin, xPosMax);
                });

                $document.mouseup(function () {
                    dragging = false;
                    $document.unbind('mousemove');
                    $document.unbind('mousemove');
                });
            };
        }
    };
}]);