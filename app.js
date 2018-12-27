var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var nunjucks=require('nunjucks');

var app = express();

// nunjucks
app.set('view engine', 'nunjucks');
nunjucks.configure('views', {
  autoescape: true,
  express: app
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));


app.use(logger('dev'));
app.use(express.json());                           // for parsing application/json
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));

// route 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter=require("./routes/admin");
var fileRouter=require("./routes/file");

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/file', fileRouter);


// ueditor
var ueditor = require("ueditor");
app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function (req, res, next) {
  //客户端上传文件设置
  var imgDir = '/img/ueditor/'
   var ActionType = req.query.action;
  if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
      var file_url = imgDir;//默认图片上传地址
      /*其他上传格式的地址*/
      if (ActionType === 'uploadfile') {
          file_url = '/file/ueditor/'; //附件
      }
      if (ActionType === 'uploadvideo') {
          file_url = '/video/ueditor/'; //视频
      }
      res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
      res.setHeader('Content-Type', 'text/html');
  }
  //  客户端发起图片列表请求
  else if (req.query.action === 'listimage') {
      var dir_url = imgDir;
      res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
  }
  // 客户端发起其它请求
  else {
      // console.log('config.json')
      res.setHeader('Content-Type', 'application/json');
      res.redirect('/ueditor/nodejs/config.json');
  }
}));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render("404.html");
  //next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
