'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/irelia', require('./irelia'))
router.use('/members', require('./members'));
router.use('/champions', require('./champions'))

// Make sure this is after all of
// the registered routes!
router.use(function(req, res) {
    res.status(404).end();
});