app.config(function($stateProvider) {
    $stateProvider.state('stats', {
        url: '/stats/:id',
        templateUrl: 'js/stats/stats.html',
        controller: 'StatsCtrl',
        resolve: {
            PlayerStats: function($stateParams, irelia, stats) {
                return irelia.getRecentMatch($stateParams.id)
            }
        }

    })
});


app.controller('StatsCtrl', function($scope, $rootScope, PlayerStats, stats, $stateParams, d3Factory) {
    //sorting the stats of the player into things to be displayed
    $scope.notHome = true;
    $scope.Math = window.Math
    $scope.player = PlayerStats
    $scope.player.id = $stateParams.id
    if ($scope.player.duration % 60 < 10) $scope.seconds = '0' + $scope.player.duration % 60
    else $scope.seconds = $scope.player.duration % 60
    $scope.player.duration = Math.floor($scope.player.duration / 60) + ':' + ($scope.seconds)
    $scope.playerStats = PlayerStats.stats
    $scope.playerTimeline = PlayerStats.timeline
    console.log($scope.player)
    $scope.getAverage = function() {
        stats.findChamp('40', 'PLATINUM').then(function(champStats) {
            console.log(champStats)
            $scope.averageStats = champStats
            $scope.averageTimeline = champStats.timeline
            $scope.imageSource = stats.getImg('champion', $scope.averageStats.name)
            $scope.spell1 = stats.getImg('spell', $scope.player.spell1Id)
            $scope.spell2 = stats.getImg('spell', $scope.player.spell2Id)
            $scope.getHigher()
        })
    }

    $scope.getHigher = function() {
        $scope.rank = 'PLATINUM'
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
        stats.findChamp('40', $scope.rank).then(function(data) {
            $scope.higherStats = data;
            $scope.higherTimeline = data.timeline;
            $scope.makeGraphs()
        })
    }

    $scope.getAverage()

    console.log('hi', $scope.playerTimeline)
    $scope.makeGraphs = function() {
        var player = $scope.player
        var average = $scope.averageStats
        var higher = $scope.higherStats
        var cs = [{
            'time': "0-10 Minutes",
            'You': player.timeline.creepsPerMinDeltas.zeroToTen,
            'Your League Average': average.timeline.creepsPerMinDeltas.zeroToTen,
            'Higher League\'s Average': higher.timeline.creepsPerMinDeltas.zeroToTen
        }, {
            'time': "10-20 Minutes",
            'You': player.timeline.creepsPerMinDeltas.tenToTwenty,
            'Your League Average': average.timeline.creepsPerMinDeltas.tenToTwenty,
            'Higher League\'s Average': higher.timeline.creepsPerMinDeltas.tenToTwenty
        }]
        var damage = [{
            'time': "0-10 Minutes",
            'You': player.timeline.damageTakenPerMinDeltas.zeroToTen,
            'Your League Average': average.timeline.damageTakenPerMinDeltas.zeroToTen,
            'Higher League\'s Average': higher.timeline.damageTakenPerMinDeltas.zeroToTen
        }, {
            'time': "10-20 Minutes",
            'You': player.timeline.damageTakenPerMinDeltas.tenToTwenty,
            'Your League Average': average.timeline.damageTakenPerMinDeltas.tenToTwenty,
            'Higher League\'s Average': higher.timeline.damageTakenPerMinDeltas.tenToTwenty
        }]
        d3Factory.createBarGraph(cs, 'cs-graph')
        d3Factory.createBarGraph(damage, 'damage-taken-graph')
    }









})

//refactor the model to copy the object you get back from the api call