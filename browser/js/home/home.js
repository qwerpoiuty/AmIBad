app.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl'
    });
});

app.controller('HomeCtrl', function($scope, irelia) {
    console.log($scope.summoner)
    $scope.sumoner;
    $scope.lookUp = function(summoner) {
        console.log($scope.summoner.name)
        irelia.getSummonerName(summoner.name).then(function(data) {
            console.log('data')
        })
    }

});