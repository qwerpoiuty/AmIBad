app.factory('irelia', function($http) {
    var irelia = {}
    irelia.getSummonerName = function(summoner) {
        return $http.get('/api/irelia/id/' + summoner).then(function(response) {
            return response.data
        })
    }

    irelia.getGameBySummoner = function(summonerId) {
        return $http.get('/api/irelia/game/' + summonerId).then(function(response) {
            return response.data
        })
    }

    irelia.getGameById = function(matchId) {
        return $http.get('/api/irelia/match/' + matchId).then(function(response) {
            return response.data
        })
    }

    irelia.getChampionStats = function(championId) {
        return $http.get('/api/irelia/champion' + champion).then(function(response) {
            return response.data
        })
    }
    return irelia;
})