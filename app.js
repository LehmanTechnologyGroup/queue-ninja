// dependencies
var fs = require('fs');
var express = require('express');
var routes = require('./routes');
var path = require('path');
var User = require('./models/user.js');
var mongoose = require('mongoose');
var passport = require('passport');
var auth = require('./authentication.js');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var expressHandlebars = require('express-handlebars');
var MongoStore = require('connect-mongo')(session);
var flash    = require('connect-flash');

mongoose
    .connect('mongodb://queueNinja:queueNinja@ds063150.mongolab.com:63150/queue-ninja', {"pass" : "queueNinja"});
mongoose.set('debug', true);

var app = express();
var hbs = expressHandlebars.create({
  layoutsDir : 'views/layouts',
  partialsDir : 'views/partials',
  defaultLayout : 'main',
  extname : '.hbs'
});

app.use(morgan('dev'));
app.set('views', __dirname + '/views');
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(cookieParser());
app.use(flash());
app.use(session({
  secret : 'key card, I dont need no fuckin keycard',
  maxAge : new Date(Date.now() + 3600000),
  store : new MongoStore({
    mongooseConnection : mongoose.connection
  })
}));

app.use(passport.initialize());
app.use(passport.session());

app.all('*', loadUserData, pageTitle);

// routes
var index = require('./routes/index.js');
var preferences = require('./routes/preferences.js');
var home = require('./routes/home.js');
var auth = require('./routes/auth.js');
var api = require('./routes/api.js');

app.use('/', index);
app.use('/preferences', preferences);
app.use('/home', home);
app.use('/auth', auth);
app.use('/api', api);

// non-grouped routes
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

function loadUserData(req, res, next) {
  if (req.isAuthenticated()) {
    User.findById(req.session.passport.user, function(err, user) {
      if (err) {
        console.log(err);
      } else {
        res.locals.user = user;

      }
      ;
    });
  }

  res.locals.isAuthenticated = req.isAuthenticated();

  next();
}

function pageTitle(req, res, next) {
  res.locals.title = 'Queue Ninja';
  next();
}

app.listen(3000);

module.exports = app
