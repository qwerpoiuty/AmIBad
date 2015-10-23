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

app.controller('StatsCtrl', function($scope, $rootScope, PlayerStats) {
    //sorting the stats into things to be displayed
    $scope.basic = {}
    $scope.basic.champion = PlayerStats.championId;
    $scope.basic.lane = PlayerStats.timeline.lane;
    $scope.basic.masteries = PlayerStats.masteries;
    $scope.basic.spell1 = PlayerStats.spell1Id;
    $scope.basic.spell2 = PlayerStats.spell2Id;
    $scope.basic.runes = PlayerStats.runes;
    $scope.basic.duration = PlayerStats.duration;

    $scope.stats = PlayerStats
    //variables for score
    $scope.score = {}
    $scope.score.score = [PlayerStats.stats.kills, PlayerStats.stats.deaths, PlayerStats.stats.assists];
    $scope.score.cs = PlayerStats.stats.minionsKilled + PlayerStats.stats.neutralMinionsKilled;
    $scope.score.jungleCs = PlayerStats.stats.neutralMinionsKilled;
    $scope.score.csTimeline = PlayerStats.timeline.creepsPerMinDeltas;
    $scope.score.csDif = PlayerStats.timeline.csDiffPerMinDeltas;

    //variables for damage in/out
    $scope.damage = {}
    $scope.damage.pDamageToC = PlayerStats.stats.physicalDamageDealtToChampions
    $scope.damage.mDamageToC = PlayerStats.stats.magicDamageDealtToChampions
    $scope.damage.tDamageToC = PlayerStats.stats.trueDamageDealtToChampions
    $scope.damage.totalDamageToC = Number($scope.damage.pDamageToC) + Number($scope.damage.mDamageToC) + Number($scope.damage.tDamageToC)
    $scope.damage.damage = PlayerStats.stats.totalDamageDealt
    $scope.damage.negDamage = PlayerStats.stats.totalDamageTaken
    $scope.damage.damageTakenDelta = PlayerStats.timeline.damageTakenPerMinDeltas
    $scope.damage.healed = PlayerStats.stats.totalHeal

    //ward
    $scope.ward = {}
    $scope.ward.greenWards = PlayerStats.stats.sightWardsBoughtInGame
    $scope.ward.pinkWards = PlayerStats.stats.visionWardsBoughtInGame
    $scope.ward.warded = PlayerStats.stats.wardsPlaced
    $scope.ward.wardsKilled = PlayerStats.stats.wardsKilled


    console.log($scope.stats)
})