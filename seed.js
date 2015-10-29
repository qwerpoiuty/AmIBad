/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Champions = mongoose.model('Champions')
var fs = require('fs');
var Irelia = require('irelia')
var q = require('q')


var irelia = new Irelia({
    secure: true,
    host: 'na.api.pvp.net',
    path: '/api/lol/',
    key: '284d9b62-8ddd-4172-b608-0fdbe6ed2dc1',
    debug: true
});


fs.readFile('zMatches/champions.json', 'utf8', function(err, data) {
    var data = JSON.parse(data)
    var champs = data.data;
})

var createChamps = function() {
    var champ = {
        id: 60,
        name: 'Elise',
        lane: 'MIDDLE',
        rank: 'PLATINUM'
    }
    var damage = {
        pDamageToChamps: 1000,
        mDamageToChamps: 1000,
        tDamageToChamps: 1000,
        totalDamageToChamps: 3000,
        damageTaken: 1000,
        damageTakenPerMin: {
            zeroToTen: 400,
            tenToTwenty: 400,
        }
    }
    var cs = {
        totalCS: 100,
        jungleCS: 20,
        csTimeline: {
            zeroToTen: 20,
            tenToTwenty: 20,
        },
        csDif: {
            zeroToTen: 0,
            tenToTwenty: 0,
        }
    }
    var wards = {
        green: 1,
        pink: 2,
        placed: 4,
        killed: 10
    }
    champ.dmgComposition = damage;
    champ.CS = cs;
    champ.wards = wards
    champ.totalEntries = 1

    return q.invoke(Champions, 'create', champ);
}

// fs.readFile('zMatches/matches1ID.json', 'utf8', function(err, data) {
//     var test = JSON.parse(data)
//     irelia.getGameBySummoner('na', test[0], function(err, response) {
//         var matchId = response.games[0].gameId

//         irelia.getMatchById('na', matchId, function(err, response) {
//             console.log(chalk.magenta('hello'), )
//             var participants = response.participants
//             participants.duration = response.matchDuration
//             for (var i = 0; i < 10; i++) {
//                 var stats = participants[i].stats
//                 var timeline = participants[i].timeline
//                 var rank = 0
//                 var champ = {
//                     id: participants[i].championId,
//                     lane: timeline.lane
//                 }
//                 switch (participants[i].highestAchievedSeasonTier) {
//                     case 'BRONZE':
//                         break;
//                     case 'SILVER':
//                         rank = 1
//                         break;
//                     case 'GOLD':
//                         rank = 2
//                         break;
//                     case 'PLATINUM':
//                         rank = 3
//                         break;
//                     case 'DIAMOND':
//                         rank = 4
//                         break;
//                     case 'MASTER':
//                         rank = 5;
//                         break;
//                     case 'CHALLENGER':
//                         rank = 6;
//                         break;
//                 }
//                 Champions.findOrCreate({$and:[
//                     id: champ.id
//                     ]
//                 }
//                 }, function(err, click, created) {
//                     // created will be true here
//                     console.log('A new click from "%s" was inserted', click.ip);
//                     Click.findOrCreate({}, function(err, click, created) {
//                         // created will be false here
//                         console.log('Did not create a new click for "%s"', click.ip);
//                     })
//                 });
//                 var dmgComposition = {
//                     pDamageToChamps: stats.physicalDamageDealtToChampions,
//                     mDamageToChamps: stats.magicDamageDealtToChampions,
//                     tDamageToChamps: stats.trueDamageDealtToChampions,
//                     totalDamageToChamps: stats.totalDamageDealtToChampions,
//                     damageTaken: stats.totalDamageTaken,
//                     damageTakenPerMin: {
//                         zeroToTen: timeline.damageTakenPerMinDeltas.zeroToTen,
//                         tenToTwenty: timeline.damageTakenPerMinDeltas.tenToTwenty,
//                     }
//                 }



//             }
//         })
//     })
// })

connectToDb.then(function() {
    return createChamps()
}).then(function() {
    console.log(chalk.green('Seed successful!'));
    process.kill(0);
}).catch(function(err) {
    console.error(err);
    process.kill(1);
});