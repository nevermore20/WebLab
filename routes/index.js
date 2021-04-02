var express = require('express');
var router = express.Router();

const lib = require('../models/Library.js');

router.get('/', function (req, res, next) {
    res.render('index', {books: lib.Library.getBook()});
});

module.exports = router;
