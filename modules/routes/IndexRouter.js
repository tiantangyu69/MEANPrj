var express = require('express');
var router = express.Router();

/**
 * 网站首地址
 */
router.get('/', function(req, res){
  res.redirect('/manage/login');
});

module.exports = router;
