app.config(function($stateProvider) {
    $stateProvider.state('summoner', {
        url: '/summoner/:id',
        templateUrl: 'js/summoner/summoner.html',
        controller: 'SummonerCtrl',
        resolve: {
            SmnStats: function($stateParams, irelia) {
                return irelia.getSmnStats($stateParams.id)
            }
        }

    })
});

app.controller('SummonerCtrl', function($scope, stats, d3Factory) {

})