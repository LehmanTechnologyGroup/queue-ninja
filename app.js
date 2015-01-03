// dependencies
var fs                  = require('fs');
var express             = require('express');
var routes              = require('./routes');
var path                = require('path');
var config              = require('./oauth.js');
var User                = require('./models/user.js');
var mongoose            = require('mongoose');
var passport            = require('passport');
var auth                = require('./authentication.js');
var morgan              = require('morgan');
var cookieParser        = require('cookie-parser');
var bodyParser          = require('body-parser');
var methodOverride      = require('method-override');
var session             = require('express-session');
var expressHandlebars   = require('express-handlebars');

// connect to the database
mongoose.connect('mongodb://queueNinja:queueNinja@ds063150.mongolab.com:63150/queue-ninja');

var app = express();
var hbs = expressHandlebars.create(
    { 
      layoutsDir : 'views/layouts',
      partialsDir : 'views/partials',
      defaultLayout : 'main',
      extname : '.hbs'
    });

app.use(morgan('dev'));
app.set('views', __dirname + '/views');
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(session({ secret: 'key card, I dont need no fuckin keycard' }));
app.use(passport.initialize());
app.use(passport.session());

// seralize and deseralize
passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user){
        if(!err) done(null, user);
        else done(err, null);
    })
});

app.all('*', loadUserData);

// routes
var index       = require('./routes/index.js');
var preferences = require('./routes/preferences.js');
var home        = require('./routes/home.js');
var auth        = require('./routes/auth.js');
var api         = require('./routes/api.js');

app.use('/', index);
app.use('/preferences', preferences);
app.use('/home', home);
app.use('/auth', auth);
app.use('/api', api);

//non-grouped routes
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function loadUserData(req, res, next) {
  if(req.isAuthenticated()) {
    User.findById(req.session.passport.user, function(err, user) {
      if(err) {
        console.log(err);
      } else {
        console.log(user);
        
        res.locals.user = user;
        
      };
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
