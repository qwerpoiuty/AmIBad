var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var Irelia = require('irelia');
var irelia = new Irelia({
    secure: true,
    host: 'na.api.pvp.net',
    path: '/api/lol/',
    key: '284d9b62-8ddd-4172-b608-0fdbe6ed2dc1',
    debug: true
});

router.get('/id/:name', function(req, res) {
    var name = req.params.name
    irelia.getSummonerByName('na', name, function(err, response) {
        var summonerId = response[Object.keys(response)[0]].id

        irelia.getGameBySummoner('na', summonerId, function(err, response) {
            var matchId = response.games[0].gameId
            var champion = response.games[0].championId

            irelia.getMatchById('na', matchId, function(err, response) {
                var participants = response.participants
                participants.duration = response.matchDuration

                for (var i = 0; i < participants.length; i++) {
                    if (participants[i].championId === champion) {
                        participants[i].duration = participants.duration
                        res.json(participants[i])
                    }
                }
            })
        })
    });

})