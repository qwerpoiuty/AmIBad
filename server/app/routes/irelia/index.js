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

router.get('/:name', function(req, res) {
    irelia.getSummonerByName('na', req.params.name, function(err, response) {
        res.json(response)
    });

})