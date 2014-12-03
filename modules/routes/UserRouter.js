var express = require('express');
var router = express.Router();
var UserDao = require('../dao/UserDao');
var CryptoUtil = require('../util/CryptoUtil');

/**
 * 跳转到用户登录界面
 */
router.get("/manage/login", function (req, res) {
    UserDao.findAll(function(list){
        console.log(list);
        if(null == list || list.length < 1){
            UserDao.save({username: 'admin', password: CryptoUtil.md5('111111'), status: 1, email: '', telephone: ''}, function(user){}
            );
        }
    });
    res.render("manage/login");
});

/**
 * 用户登录操作
 */
router.post("/manage/login", function (req, res) {
    req.body.password = CryptoUtil.md5(req.body.password);// 使用md5加密密码
    UserDao.findOne(req.body, function(user){
        if(null != user){
            if(user.status == 1){
                req.session.user = user;
                res.json({status: 1, msg: '登录成功！'});
            } else{// 用户被停用
                res.json({status: 0, msg: '您的账号已被停用，如有问题请联系管理员！'});
            }
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

    UserDao.queryPageAndSort(currentPage, pageSize, {
            username: new RegExp(req.body.username),
            telephone: new RegExp(req.body.telephone)
        }, {createDate: -1} ,
        function(page){
            var result = {};
            result.total = page.totalCount;
            result.rows = page.dataList;
            res.json(result);
        }
    );
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
    req.body.password = CryptoUtil.md5('111111');// 使用md5加密默认密码
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
    UserDao.deleteByQuery({_id: {$in: req.body.ids}}, function(err){
        if(null == err){
            res.json({status: 1, msg: '用户删除成功！', showDialog: true});
        } else{
            console.log(err, ":", req.body.ids);
            res.json({status: 0, msg: '用户删除失败！', showDialog: true});
        }
    });
});

/**
 * 跳转到修改用户界面
 */
router.get("/manage/user/edit", function(req, res){
    UserDao.fetch(req.query.id, function(user){
        res.render('manage/user/edit', {user: user});
    });
});

/**
 * 保存修改的数据
 */
router.post("/manage/user/edit", function(req, res){
    UserDao.updateById(req.body.id, req.body, function(err){
        if(null == err){
            res.json({status: 1, msg: '用户修改成功！', showDialog: true});
        } else{
            res.json({status: 0, msg: '用户修改失败！', showDialog: true});
        }
    });
});

/**
 * 重置密码
 */
router.post("/manage/user/resetpwd", function(req, res){
    UserDao.update({_id: {$in: req.body.ids}}, {password: CryptoUtil.md5('111111')}, function(err){
        if(null == err){
            res.json({status: 1, msg: '密码重置成功！', showDialog: true});
        } else{
            res.json({status: 0, msg: '密码重置失败！', showDialog: true});
        }
    });
});

module.exports = router;