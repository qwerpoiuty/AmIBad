app.factory('stats', function($http) {
    var stats = {}
    var match = {}
    stats.setMatch = function(match) {
        match = match
    }
    stats.getMatch = function() {
        return match;
    }
    stats.findChamp = function(champ) {
        var query = {}
        query.id = champ.id
        query.lane = champ.lane
        query.rank = champ.rank
        return $http.get('/champ', {
                params: query
            })
            .then(function(response) {
                return response.data
            })
    }

})