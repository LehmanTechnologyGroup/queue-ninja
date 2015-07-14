var router = require('express').Router();

var UserPreferencesSchema = require('../models/userPreferences.js')

router.get('/account', ensureAuthenticated, function(req, res) {
  UserPreferencesSchema.findById(req.session.passport.user,
      function(err, userPreferences) {
        if (err) {
          console.log(err);
          var response = {
            "response-status" : "ERROR",
            "user-id" : req.params.userId
          }
          res.json(response);
        } else {
          var response = {
            "response-status" : "SUCCESS",
            "user-id" : req.params.userId,
            "user-queues" : userPreferences
          }
          res.json(response);
        }
      })
});

// this will likely need to move
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = router;
