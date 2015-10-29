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
    dmgComposition: {
        pDamageToChamps: {
            type: Number,
            default: 0
        },
        mDamageToChamps: {
            type: Number,
            default: 0
        },
        tDamageToChamps: {
            type: Number,
            default: 0
        },
        totalDamageToChamps: {
            type: Number,
            default: 0
        },
        damageTaken: {
            type: Number,
            default: 0
        },
        damageTakenPerMin: {
            zeroToTen: {
                type: Number,
                default: 0
            },
            tenToTwenty: {
                type: Number,
                default: 0
            },
        }
    },
    CS: {
        totalCS: {
            type: Number,
            default: 0
        },
        jungleCS: {
            type: Number,
            default: 0
        },
        csTimeline: {
            zeroToTen: {
                type: Number,
                default: 0
            },
            tenToTwenty: {
                type: Number,
                default: 0
            },
        },
        csDif: {
            zeroToTen: {
                type: Number,
                default: 0
            },
            tenToTwenty: {
                type: Number,
                default: 0
            },
        }
    },
    wards: {
        green: {
            type: Number,
            default: 0
        },
        pink: {
            type: Number,
            default: 0
        },
        placed: {
            type: Number,
            default: 0
        },
        killed: {
            type: Number,
            default: 0
        }
    },
    totalEntries: {
        type: Number,
        default: 0
    }

})
schema.plugin(findOrCreate)
mongoose.model('Champions', schema)