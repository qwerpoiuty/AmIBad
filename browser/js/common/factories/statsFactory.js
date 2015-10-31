app.factory('stats', function($http) {
    var stats = {}
    var match = {}
    var summonerSpells = {
        21: 'SummonerBarrier',
        1: 'SummonerBoost',
        2: 'SummonerClairvoyance',
        14: 'SummonerDot',
        3: 'SummonerExhaust',
        4: 'SummonerFlash',
        6: 'SummonerHaste',
        7: 'SummonerHeal',
        13: 'SummonerMana',
        11: 'SummonerSmite',
        12: 'SummonerTeleport',
    }
    stats.setMatch = function(game) {
        console.log(game)
        match = game
    }
    stats.getMatch = function() {
        return match;
    }
    stats.findChamp = function(champ, rank) {
        var query = {}
        query.id = 60
        query.lane = 'JUNGLE'
        query.rank = 'PLATINUM'
        return $http.get('/api/champions/champion', {
                params: query
            })
            .then(function(response) {
                return response.data
            })
    }

    stats.getImg = function(type, target) {
        var blank = '//ddragon.leagueoflegends.com/cdn/5.22.1/img/TYPE/TARGET.png'
        if (type === 'spell') target = summonerSpells[target]
        var url = blank.replace(/TARGET/i, target)
        url = url.replace(/TYPE/i, type)

        return url
    }

    return stats

})