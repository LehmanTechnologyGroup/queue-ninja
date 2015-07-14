var express     = require('express');
var router      = express.Router();


/* GET home page. */
router.all("../", ensureAuthenticated, pageTitleConcat);
router.get('/', function(req, res, next) {
 res.render('home');
});

function ensureAuthenticated(req, res, next) {
  console.log("ensuring authenticated");
  if (req.isAuthenticated()) { return next(); }
  res.redirect('');
}

function pageTitleConcat(req, res, next) {
  res.locals.title = res.locals.title + ' - My Queues';
  next();
}

module.exports = router;
