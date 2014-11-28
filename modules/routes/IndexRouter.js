var express = require('express');
var router = express.Router();
var path = require('path');

/**
 * 网站首地址
 */
router.get('/', function(req, res){
  res.redirect('/manage/login');
});

module.exports = router;
