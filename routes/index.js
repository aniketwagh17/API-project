var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NodeJS Bootcamp' });
});

router.get('/json', function(req, res, next) {
  res.json( { title: 'NodeJS Bootcamp json' });
});

module.exports = router;
