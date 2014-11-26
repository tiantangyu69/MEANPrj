var express = require('express');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
var ueditor = require("ueditor");

var indexRouter = require('./modules/routes/IndexRouter');
var userRouter = require('./modules/routes/UserRouter');
var manageMainRouter = require('./modules/routes/ManageMainRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'sagacity.nodejs'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ueditor上传图片
app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function (req, res, next) {
    // ueditor 客户发起上传图片请求
    if (req.query.action === 'uploadimage') {
        var foo = req.ueditor;
        var date = new Date();
        var imgname = req.ueditor.filename;

        var img_url = '/upload/ueditor/';
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = '/upload/ueditor/';
        res.ue_list(dir_url);  // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json')
    }
}));

app.use(multer());

app.use(function (req, res, next) {
    //res.locals.title = config['title']
    res.locals.csrf = req.session ? req.session._csrf : '';
    res.locals.req = req;
    res.locals.session = req.session;
    res.locals.user = req.session.user;

    // console.log('%s %s', req.method, req.url);
    next();
});

// 配置router
app.use(indexRouter);
app.use(userRouter);
app.use(manageMainRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// 连接mongodb数据库
mongoose.connect('mongodb://127.0.0.1:27017/MEANBlog');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));
db.once('open', function callback() {
    console.log("mongodb is open!");
});

// 关闭mongodb连接
app.on('close', function (err) {
    mongoose.disconnect(function (err) {
        console.log("mongodb is close!");
    });
});

module.exports = app;
