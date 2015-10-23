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
var Champions = Promise.promisifyAll(mongoose.model('Champions'))
var fs = require('fs');
var Irelia = require('irelia')

var irelia = new Irelia({
    secure: true,
    host: 'na.api.pvp.net',
    path: '/api/lol/',
    key: '284d9b62-8ddd-4172-b608-0fdbe6ed2dc1',
    debug: true
});

fs.readFile('zMatches/matches1ID.json', 'utf8', function(err, data) {
    var test = JSON.parse(data)
    irelia.getGameBySummoner('na', test[0], function(err, response) {
        var matchId = response.games[0].gameId
        var champion = response.games[0].championId

        irelia.getMatchById('na', matchId, function(err, response) {
            console.log(chalk.magenta('hello'), )
            var participants = response.participants
            participants.duration = response.matchDuration

            for (var i = 0; i < 10; i++) {

            }
        })
    })
})

// connectToDb.then(function() {
//     User.findAsync({}).then(function(users) {
//         if (users.length === 0) {
//             return seedUsers();
//         } else {
//             console.log(chalk.magenta('Seems to already be user data, exiting!'));
//             process.kill(0);
//         }
//     }).then(function() {
//         console.log(chalk.green('Seed successful!'));
//         process.kill(0);
//     }).catch(function(err) {
//         console.error(err);
//         process.kill(1);
//     });
// });