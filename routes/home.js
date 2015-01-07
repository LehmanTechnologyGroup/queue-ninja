var express     = require('express');
var router      = express.Router();
var UserQueue        = require('../models/userQueue.js')


/* GET home page. */
router.all("/", ensureAuthenticated, pageTitleConcat);
router.get('/', function(req, res, next) {
  console.log("main function for home");
  UserQueue.find({ userId: req.session.passport.user, hidden: false}, function(err, queues) {
    if(err) {
      console.log(err);
      res.render('home', {errors: err});
    } else {
      res.render('home', { queues: queues});
    };
  });
});

function ensureAuthenticated(req, res, next) {
  console.log("ensuring authenticated");
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}

function pageTitleConcat(req, res, next) {
  res.locals.title = res.locals.title + ' - My Queues';
  next();
}

module.exports = router;
