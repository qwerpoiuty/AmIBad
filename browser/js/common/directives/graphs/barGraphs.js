app.directive('graphs', function(d3Factory) {
    return {
        restrict: 'E',
        scope: {
            graphData: '='
        },
        templateUrl: 'js/common/directives/graphs/graph.html',
        link: function(scope, element, attrs) {

        }
    }
})