app.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl'
    });
});

app.controller('HomeCtrl', function($scope, $state, irelia) {
    $scope.summoner;
    $scope.lookUp = function(summoner) {
        var bar = 'bar'
        $state.go('stats', {
            id: summoner
        })

    }

});