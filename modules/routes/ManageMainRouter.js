/**
 * Created by LIZHITAO on 2014/11/25 0025.
 */
var express = require('express');
var router = express.Router();

router.get('/manage/main', function(req, res){
    res.render('manage/main');
});

router.get('/manage/menu', function(req, res){
    var treeData = [{
        "id":1,
        "text":"系统管理",
        "children":[{
            id: 2,
            "text":"用户管理",
            attributes: {
                url: '/manage/user/manager'
            }
        },{
            id: 3,
            "text":"用户权限",
            "iconCls":"icon-lock"
        }]
    },{
        id: 9,
        "text":"系统帮助",
        "iconCls":"icon-help",
        "children":[{
            id: 10,
            "text":"用户手册"
        },{
            id: 11,
            "text":"问题反馈"
        }]
    }];
    res.json(treeData);
});

module.exports = router;
