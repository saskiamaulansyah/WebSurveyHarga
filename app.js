const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

var session = require('express-session');

const db = require('./models');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

const { jwtMiddleware } = require('./middlewares');

//use hbs view engine
const ejs = require('ejs');
const app = express();
 
//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('trust proxy',1);
app.use(session({
  secret: 'ssshhhhh',
  // create new redis store.
 
}));
app.use('/', indexRouter);
app.use('/', authRouter);
// app.use(`${api}/post`, jwtMiddleware, postRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});


// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

 
const port = 8000;
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
});


module.exports = app;
