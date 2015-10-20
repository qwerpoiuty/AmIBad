app.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl'
    });
});

app.controller('HomeCtrl', function($scope, irelia) {
    $scope.summoner;
    $scope.lookUp = function(summoner) {
        irelia.getSummonerName(summoner.name)
            .then(function(data) {
                console.log('data', data)

            })
    }

});