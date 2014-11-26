var express = require('express');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');

var loginInterceptor = require('./modules/interceptor/LoginInterceptor');
var ueditorRouter = require('./modules/routes/UeditorRouter');
var indexRouter = require('./modules/routes/IndexRouter');
var userRouter = require('./modules/routes/UserRouter');
var manageMainRouter = require('./modules/routes/ManageMainRouter');

var app = express();

// 视图引擎设置
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// 在/public目录下配置网站的 favicon
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger('dev'));
app.use(session({resave: true, saveUninitialized: true, secret: 'sagacity.nodejs'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 配置拦截器
app.use(loginInterceptor);
// ueditor上传图片
app.use(ueditorRouter);
// 配置文件上传
app.use(multer());

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

// 错误处理

// 开发环境错误处理，打印错误堆栈
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// 生成环境错误处理
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
