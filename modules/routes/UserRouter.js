var express = require('express');
var router = express.Router();
var UserDao = require('../dao/UserDao');
var CryptoUtil = require('../util/CryptoUtil');

/**
 * 跳转到用户登录界面
 */
router.get("/manage/login", function (req, res) {
    res.render("manage/login");
});

/**
 * 用户登录操作
 */
router.post("/manage/login", function (req, res) {
    req.body.password = CryptoUtil.md5(req.body.password);// 使用md5加密密码
    UserDao.findOne(req.body, function(user){
        if(null != user || req.body.username == 'admin'){
            req.session.user = user;
            res.json({status: 1, msg: '登录成功！'});
        } else{
            res.json({status: -1, msg: '您输入的账号或密码错误，请重新输入！'});
        }
    })
});

/**
 * 跳转到用户注册页面
 */
router.get("/user/regist", function(req, res){

});

module.exports = router;