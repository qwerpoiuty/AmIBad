app.factory('stats', function($http) {
    var stats = {}
    var match = {}
    stats.setMatch = function(game) {
        match = game
    }
    stats.getMatch = function() {
        return match;
    }
    stats.findChamp = function(champ) {
        var query = {}
        query.id = 60
        query.lane = 'JUNGLE'
        query.rank = 'PLATINUM'
        return $http.get('/api/champions/champion', {
                params: query
            })
            .then(function(response) {
                console.log(response.data)
                return response.data
            })
    }

    return stats

})