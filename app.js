var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/student');
var usersRouter = require('./routes/users');
//khai báo route
var studentRouter = require('./routes/student');
var app = express();
//5. create dateformat
var hbs = require('hbs');
hbs.registerHelper('dateFormat', require('handlebars-dateformat')); 
hbs.registerHelper('equal', require('handlebars-helper-equal'))

//1. cấu hình body-parser(lấy input data từ form)
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

var mongoose = require('mongoose');
// cần khai báo db name trong url. vd : "gch1103"
var db = "mongodb+srv://huyvtgch211136:vutronghuygrw24092003ne@cluster0.limh831.mongodb.net/Student";
mongoose.connect(db)
.then(() => console.log('ok'))
.catch(() => console.log('failed'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//4b. set url cho từng router
app.use('/student', studentRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
//3. cấu hình port cho web để deploy lên render

app.listen(process.env.PORT || 3001);


module.exports = app;
