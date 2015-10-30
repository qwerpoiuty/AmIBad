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
    $scope.Math = window.Math
    $scope.player = PlayerStats
    $scope.player.id = $stateParams.id
    $scope.player.duration = Math.floor($scope.player.duration / 60) + ':' + ($scope.player.duration % 60)
    $scope.playerStats = PlayerStats.stats
    $scope.playerTimeline = PlayerStats.timeline

    $scope.getAverage = function() {
        stats.findChamp(PlayerStats.championId, PlayerStats.highestAchievedSeasonTier).then(function(data) {
            $scope.averageStats = data
            $scope.averageTimeline = data.timeline
            var url = '//ddragon.leagueoflegends.com/cdn/5.19.1/img/champion/' + $scope.averageStats.name + '.png'
            $scope.imageSource = url
        })
    }

    $scope.getHigher = function() {
        var rank = ''
        switch ($scope.player.highestAchievedSeasonTier) {
            case 'BRONZE':
                rank = 'SILVER'
                break
            case 'SILVER':
                rank = 'GOLD'
                break
            case 'GOLD':
                rank = 'PLATINUM'
                break
            case 'PLATINUM':
                rank = 'DIAMOND'
                break
            case 'DIAMOND':
                rank = 'MASTER'
                break
            case 'MASTER':
                rank = 'CHALLENGER'
                break
            case 'CHALLENGER':
                rank = 'CHALLENGER'
        }
        stats.findChamp(PlayerStats.championId, rank).then(function(data) {
            $scope.higherStats = data;
            $scope.higherTimeline = data.timeline;
        })
    }
    $scope.getHigher()
    $scope.getAverage()

    console.log($scope.averageStats)









})

//refactor the model to copy the object you get back from the api call