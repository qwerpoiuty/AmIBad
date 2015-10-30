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

app.controller('StatsCtrl', function($scope, $rootScope, PlayerStats, stats, $stateParams) {
    //sorting the stats of the player into things to be displayed
    $scope.player = PlayerStats
    $scope.player.id = $stateParams.id
    $scope.player.duration = Math.floor($scope.player.duration / 60) + ':' + ($scope.player.duration % 60)
    $scope.playerStats = PlayerStats.stats
    $scope.playerTimeline = PlayerStats.timeline


    //average performance
    $scope.getAverage = function() {
        stats.findChamp(PlayerStats.championId).then(function(data) {
            $scope.averageStats = data
            $scope.averageTimeline = data.timeline
        })
    }

    $scope.getAverage()
})

//refactor the model to copy the object you get back from the api call