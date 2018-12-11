var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  let query=res.query;
  res.send('respond with a resource ');
});

module.exports = router;
