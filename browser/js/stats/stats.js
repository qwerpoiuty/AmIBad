app.config(function($stateProvider) {
    $stateProvider.state('stats', {
        url: '/stats/:id',
        templateUrl: 'js/stats/stats.html',
        controller: 'StatsCtrl',
        resolve: {
            PlayerStats: function(stats, $stateParams) {
                return stats.findChamp('40', 'PLATINUM')
            }

        }
    });
});

app.controller('StatsCtrl', function($scope, $rootScope, PlayerStats, stats, $stateParams, d3Factory) {
    //sorting the stats of the player into things to be displayed
    $scope.Math = window.Math
    $scope.player = PlayerStats
    $scope.player.id = $stateParams.id
    $scope.player.duration = Math.floor($scope.player.duration / 60) + ':' + ($scope.player.duration % 60)
    $scope.playerStats = PlayerStats.stats
    $scope.playerTimeline = PlayerStats.timeline

    $scope.getAverage = function() {
        stats.findChamp('40', 'PLATINUM').then(function(champStats) {
            console.log(champStats)
            $scope.averageStats = champStats
            $scope.averageTimeline = champStats.timeline
            $scope.imageSource = stats.getImg('champion', $scope.averageStats.name)
            $scope.spell1 = stats.getImg('spell', $scope.player.spell1Id)
            $scope.spell2 = stats.getImg('spell', $scope.player.spell2Id)
            $scope.makeGraphs()
        })
    }

    $scope.getHigher = function() {
        var rank = 'PLATINUM'
            // switch ($scope.player.highestAchievedSeasonTier) {
            //     case 'BRONZE':
            //         rank = 'SILVER'
            //         break
            //     case 'SILVER':
            //         rank = 'GOLD'
            //         break
            //     case 'GOLD':
            //         rank = 'PLATINUM'
            //         break
            //     case 'PLATINUM':
            //         rank = 'DIAMOND'
            //         break
            //     case 'DIAMOND':
            //         rank = 'MASTER'
            //         break
            //     case 'MASTER':
            //         rank = 'CHALLENGER'
            //         break
            //     case 'CHALLENGER':
            //         rank = 'CHALLENGER'
            // }
        stats.findChamp('40', rank).then(function(data) {
            $scope.higherStats = data;
            $scope.higherTimeline = data.timeline;
        })
    }
    $scope.getHigher()
    $scope.getAverage()

    $scope.makeGraphs = function() {
        var player = $scope.player
        var average = $scope.averageStats
        console.log($scope.higherStats)
        var higher = $scope.higherStats
        var damage = [
            [1, player.physicalDamageDealtToChampions, player.magicDamageDealtToChampions, player.trueDamageDealtToChampions],
            [2, average.physicalDamageDealtToChampions, average.magicDamageDealtToChampions, average.trueDamageDealtToChampions],
            [3, average.physicalDamageDealtToChampions, average.magicDamageDealtToChampions, average.trueDamageDealtToChampions]
        ]
        console.log('damage', damage)
        d3.createStackedGraph(damage)
    }









})

//refactor the model to copy the object you get back from the api call