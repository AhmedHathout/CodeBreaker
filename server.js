var express       = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var mongoose      = require('mongoose');
var morgan        = require('morgan');
var bodyParser    = require('body-parser');
var passport 	  = require('passport');
var BasicStrategy = require('passport-http').Strategy;
var stripe= require("stripe")("sk_test_aFldNEUKYSuPZ63JQa2hhGVD"); //Secret Key for payment method
var cookieParser  = require('cookie-parser');
var expressSession = require('express-session');
var flash         = require('req-flash');



var routes = require('./app/routes')(passport);


var app = express();
var port = 8080;

mongoose.connect('mongodb://localhost:27017/CodeBreaker');
// require('./config/passport')(passport);

app.use(morgan('dev'));

app.use(cookieParser());
app.use(expressSession({secret: 'mySecretKey'}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname+ '/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine','html');
app.use(bodyParser.urlencoded({limit:'50mb',extended:false}));
app.use(bodyParser.json());
app.use(flash());

var initPassport = require('./passport/init');
initPassport(passport);

// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }
app.use(routes);
app.use('/', routes);

app.listen(port,function(){
  console.log(port);
});

module.exports = app;
