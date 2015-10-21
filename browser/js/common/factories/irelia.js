app.factory('irelia', function($http) {
    var irelia = {}

    irelia.getRecentMatch = function(summoner) {
        return $http.get('/api/irelia/id/' + summoner).then(function(response) {
            return response.data
        })
    }

    return irelia;

})