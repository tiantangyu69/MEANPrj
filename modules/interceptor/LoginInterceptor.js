/**
 * Created by Admin on 2014/11/26.
 */
var express = require('express');
var router = express.Router();
var StringUtil = require('../util/StringUtil');

router.use(function (req, res, next) {
    //res.locals.title = config['title']
    res.locals.csrf = req.session ? req.session._csrf : '';
    res.locals.req = req;
    res.locals.session = req.session;
    res.locals.user = req.session.user;
    //console.log('%s %s', req.method, req.url);

    // session过时或未登录直接跳到登录页面
    if(StringUtil.startWith(req.url, "/manage/")){
        if(req.url == "/manage/login"){
            next();
        } else{
            if(req.session.user == null || null == req.session.user.username){
                res.redirect('/manage/login');
            } else{
                next();
            }
        }
    } else{
        next();
    }
});

module.exports = router;