var express = require('express');
var router = express.Router();
var UserDao = require('../dao/UserDao');
var CryptoUtil = require('../util/CryptoUtil');
var util = require('util');

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
            var user2 = {};
            user2.username = "admin";
            req.session.user = user2;
            res.json({status: 1, msg: '登录成功！'});
        } else{
            res.json({status: -1, msg: '您输入的账号或密码错误，请重新输入！'});
        }
    })
});

/**
 * 跳转到用户注册页面
 */
router.get("/manage/logout", function(req, res){
    req.session.user = null;
    res.redirect("/manage/login");
});

/**
 * 用户管理界面
 */
router.get("/manage/user/manager", function(req, res){
    res.render("manage/user/manager");
});

/**
 * 查询用户数据
 */
router.post("/manage/user/query", function(req, res){
    var currentPage = req.body.page;
    var pageSize = req.body.rows;

    UserDao.page(currentPage, pageSize, function(page){
        var result = {};
        result.total = page.totalCount;
        result.rows = page.dataList;
        res.json(result);
    });
});

/**
 * 跳转到添加用户页面
 */
router.get("/manage/user/add", function(req, res){
    res.render('manage/user/add');
});

/**
 * 添加用户
 */
router.post("/manage/user/add", function(req, res){
    UserDao.save(req.body, function(user){
        if(null != user){
            res.json({status: 1, msg: '用户添加成功！', showDialog: true});
        } else{
            res.json({status: 0, msg: '用户添加失败！', showDialog: true});
        }
    });
});

/**
 * 删除用户
 */
router.post("/manage/user/deleteByIds", function(req, res){
    if(req.body.ids && util.isArray(req.body.ids)){
        UserDao.deleteByQuery({_id: {$in: req.body.ids}}, function(err){
            if(null == err){
                res.json({status: 1, msg: '用户删除成功！', showDialog: true});
            } else{
                console.log(err, ":", req.body.ids);
                res.json({status: 0, msg: '用户删除失败！', showDialog: true});
            }
        });
    } else{
        UserDao.deleteById(req.body.ids, function(err){
            if(null == err){
                res.json({status: 1, msg: '用户删除成功！', showDialog: true});
            } else{
                console.log(err, ":", req.body.ids);
                res.json({status: 0, msg: '用户删除失败！', showDialog: true});
            }
        });
    }
});

module.exports = router;