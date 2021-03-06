app.factory('irelia', function($http, stats) {
    var irelia = {}

    irelia.getRecentMatch = function(summoner) {
        return $http.get('/api/irelia/id/' + summoner).then(function(response) {
            stats.setMatch(response.data)
            var participants = response.data.participants
            for (var i = 0; i < participants.length; i++) {
                if (participants[i].championId === response.data.champ) {
                    participants[i].duration = response.data.matchDuration
                    return participants[i]
                }
            }
        })
    }

    irelia.getSmnStats = function(summoner) {
        return $http.get('/api/irelia/stats/' + summoner).then(function(response) {
            return response.data
        })
    }

    return irelia
})