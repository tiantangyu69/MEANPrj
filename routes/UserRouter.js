var express = require('express');
var router = express.Router();
var UserDao = require('../modules/dao/UserDao');
var mongoose = require('mongoose');

router.get("/user/login", function(req, res){
    res.render("portal/login");
});

module.exports = router;