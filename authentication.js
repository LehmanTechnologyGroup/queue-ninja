var passport = require('passport')
var User = require('./models/user.js')
var config = require('./config/oauth.js')

// Authentication Strataties go here
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GithubStrategy = require('passport-github').Strategy;
var GoogleStrategy = require('passport-google').Strategy;
var LocalStrategy = require('passport-local').Strategy;

passport.use(new FacebookStrategy({
  clientID : config.facebook.clientID,
  clientSecret : config.facebook.clientSecret,
  callbackURL : config.facebook.callbackURL
}, function(accessToken, refreshToken, profile, done) {
  console.log("pre db call");
  User.findOne({
    oauthID : profile.id
  }, function(err, user) {
    if (err) {
      console.log(err);
    }
    if (!err && user != null) {
      done(null, user);
    } else {
      var user = new User({
        oauthID : profile.id,
        name : profile.displayName,
        created : Date.now()
      });
      user.save(function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("saving user ...");
          done(null, user);
        }
        ;
      });
    }
    ;
  });
}));

passport.use(new TwitterStrategy({
  consumerKey : config.twitter.consumerKey,
  consumerSecret : config.twitter.consumerSecret,
  callbackURL : config.twitter.callbackURL
}, function(accessToken, refreshToken, profile, done) {
  User.findOne({
    oauthID : profile.id
  }, function(err, user) {
    if (err) {
      console.log(err);
    }
    if (!err && user != null) {
      done(null, user);
    } else {
      var user = new User({
        oauthID : profile.id,
        name : profile.displayName,
        created : Date.now()
      });
      user.save(function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("saving user ...");
          done(null, user);
        }
      });
    }
  });
}));

passport.use(new GithubStrategy({
  clientID : config.github.clientID,
  clientSecret : config.github.clientSecret,
  callbackURL : config.github.callbackURL
}, function(accessToken, refreshToken, profile, done) {
  User.findOne({
    oauthID : profile.id
  }, function(err, user) {
    if (err) {
      console.log(err);
    }
    if (!err && user != null) {
      done(null, user);
    } else {
      var user = new User({
        oauthID : profile.id,
        name : profile.displayName,
        created : Date.now()
      });
      user.save(function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("saving user ...");
          done(null, user);
        }
      });
    }
  });
}));

passport.use(new GoogleStrategy({
  returnURL : config.google.returnURL,
  realm : config.google.realm
}, function(accessToken, refreshToken, profile, done) {
  User.findOne({
    oauthID : profile.id
  }, function(err, user) {
    if (err) {
      console.log(err);
    }
    if (!err && user != null) {
      done(null, user);
    } else {
      var user = new User({
        oauthID : profile.id,
        name : profile.displayName,
        created : Date.now()
      });
      user.save(function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("saving user ...");
          done(null, user);
        }
      });
    }
  });
}));

passport.use('local-signup', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
}, function(req, email, password, done) {
  process.nextTick(function() {
    User.findOne({
      'local.email' : email
    }, function(err, user) {
      if (err) {
        console.log("db error when trying to find user with email: " + email +" during singup process.")
        return done(err);
      }

      if (user) {
        return done(null, false, req.flash('SignupMessage', 'That email is already taken.'));
      } else {
        var newUser = new User();

        newUser.local.email = email;
        newUser.local.password = newUser.generateHash(password);

        newUser.save(function(err) {
          if (err) {
            console.log("Error occured during attempted save of user.");
            throw err;
          }
          
          return done(null, newUser);
        });
      }
    });
  });
}));

passport.use('local-login', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
}, function(req, email, password, done) {
  User.findOne({ 
    'local.email' :  email 
  }, function(err, user) {
      if (err)
          return done(err);

      if (!user)
          return done(null, false, req.flash('loginMessage', 'No user found.'));

      if (!user.validPassword(password))
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

      return done(null, user);
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    if (!err)
      done(null, user);
    else{
      console.log("Error occured during deserialization of user.");
      done(err, null);
    }
  })
});

module.exports = passport;