var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var items = [{ title: "foo", id: 1 }, { title: "bar", id: 2}];
  res.render('index.html', {items});
});

module.exports = router;
