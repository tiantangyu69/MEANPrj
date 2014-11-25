/**
 * Created by LIZHITAO on 2014/11/25 0025.
 */
var express = require('express');
var router = express.Router();

router.get('/manage/main', function(req, res){
    res.render('manage/main');
});

module.exports = router;
