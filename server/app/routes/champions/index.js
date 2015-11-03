var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose')
var _ = require('lodash');
var Champions = mongoose.model('Champions')

router.get('/champion', function(req, res) {
    var modelParams = req.query
    Champions.findOne(modelParams).then(function(champ) {
        res.json(champ)
    })
})