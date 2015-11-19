'use strict';
var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate')
var schema = new mongoose.Schema({
    id: Number,
    name: String,
    lane: String,
    rank: String,
    kills: Number,
    deaths: Number,
    assists: Number,
    physicalDamageDealtToChampions: {
        type: Number,
        default: 0
    },
    magicDamageDealtToChampions: {
        type: Number,
        default: 0
    },
    trueDamageDealtToChampions: {
        type: Number,
        default: 0
    },
    totalDamageDealtToChampions: {
        type: Number,
        default: 0
    },
    totalDamageTaken: Number,
    totalHeal: Number,
    minionsKilled: Number,
    neutralMinionsKilled: Number,
    sightWardsBoughtInGame: Number,
    visionWardsBoughtInGame: Number,
    wardsPlaced: Number,
    wardsKilled: Number,
    timeline: {
        damageTakenPerMinDeltas: {
            zeroToTen: Number,
            tenToTwenty: Number
        },
        creepsPerMinDeltas: {
            zeroToTen: Number,
            tenToTwenty: Number
        },
        csDiffPerMinDeltas: {
            zeroToTen: Number,
            tenToTwenty: Number
        }


    },
    totalEntries: {
        type: Number,
        default: 0
    }

})
schema.plugin(findOrCreate)
mongoose.model('Champions', schema)