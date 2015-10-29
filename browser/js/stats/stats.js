app.config(function($stateProvider) {
    $stateProvider.state('stats', {
        url: '/stats/:id',
        templateUrl: 'js/stats/stats.html',
        controller: 'StatsCtrl',
        resolve: {
            PlayerStats: function(irelia, $stateParams) {
                return irelia.getRecentMatch($stateParams.id)
            }

        }
    });
});

app.controller('StatsCtrl', function($scope, $rootScope, PlayerStats, stats) {
    //sorting the stats of the player into things to be displayed

    $scope.playerStats = PlayerStats.stats
    $scope.playerTimeline = PlayerStats.timeline

    console.log($scope.playerStats)

    //average performance
    $scope.getAverage = function() {
        stats.findChamp(PlayerStats.championId).then(function(data) {
            $scope.average = data
        })
    }
})