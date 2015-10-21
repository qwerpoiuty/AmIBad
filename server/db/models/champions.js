'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    id: Number,
    lane: String,
    masteries: [Number],
    rank: [{
        runes: [Number],
        masteries: [Number],
        dmgComposition: {
            pDamageToChamps: Number,
            mDamageToChamps: Number,
            tDamageToChamps: Number,
            totalDamageToChamps: Number,
            damageTaken: Number,
            damageTakenPerMin: [Number]
        },
        CS: {
            totalCS: Number,
            jungleCS: Number,
            csTimeline: [Number],
            csDif: [Number]
        },
        wards: {
            green: Number,
            pink: Number,
            placed: Number,
            killed: Number
        }
    }]
})

mongoose.model('champions', schema)