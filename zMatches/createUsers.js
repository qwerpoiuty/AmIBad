var fs = require('fs');

fs.readFile('zMatches/matches10.json', 'utf8', function(err, data) {
    var result = JSON.parse(data)
    var ids = []
    for (var i = 0; i < result.matches.length; i++) {
        for (var j = 0; j < result.matches[i].participantIdentities.length; j++) {
            if (ids.indexOf(result.matches[i].participantIdentities[j].player.summonerId) === -1) ids.push(result.matches[i].participantIdentities[j].player.summonerId)
        }
    }
    console.log('ids', ids)
    ids = JSON.stringify(ids)
    fs.writeFile('zMatches/matches10ID.json', ids, function(err) {
        if (err) throw err;
        console.log('success')
    })

})