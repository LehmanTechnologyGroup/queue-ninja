var router      = require('express').Router();
var passport    = require('passport');

router.get('/facebook',
  passport.authenticate('facebook'),
  function(req, res){
  console.log("/auth/facebook")
});

router.get('/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/?loginFailure=true' }),
  function(req, res) {
    console.log("redirecting after facebook log in");
    res.redirect('/home');
});

router.get('/twitter',
  passport.authenticate('twitter'),
  function(req, res){
});

router.get('/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/home');
});

router.get('/github',
  passport.authenticate('github'),
  function(req, res){
});

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/home');
});

router.get('/google',
  passport.authenticate('google'),
  function(req, res){
});

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/home');
});


router.post('/signup', 
  passport.authenticate('local-signup', {
  successRedirect : '/home', 
  failureRedirect : '/#signup',
  failureFlash : true
}));

router.post('/signin', 
  passport.authenticate('local-login', {
  successRedirect : '/home', 
  failureRedirect : '/#login',
  failureFlash : true
}));

module.exports = router;
