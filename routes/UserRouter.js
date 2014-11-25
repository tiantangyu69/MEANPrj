var express = require('express');
var router = express.Router();
var UserDao = require('../modules/dao/UserDao');
var mongoose = require('mongoose');

router.get("/user/login", function(req, res){
    UserDao.queryPage(1, 5, null, {age : -1}, function(page){
        console.log(page);
    });

    res.render("portal/login");
});

module.exports = router;