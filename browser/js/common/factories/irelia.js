app.factory('irelia', function($http) {
    var irelia = {}
    irelia.getSummonerName = function(summoner) {
        return $http.get('/api/irelia/' + summoner).then(function(response) {
            return response.data
        })
    }

    return irelia;
})