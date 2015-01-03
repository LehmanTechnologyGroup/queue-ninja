var express = require('express');
var router = express.Router();

router.all('/', pageTitleConcat);

router.get('/', function(req, res) {
  console.log("rendering");
  res.render('index');
});

function pageTitleConcat(req, res, next) {
  
  res.locals.title = res.locals.title + ' - Welcome to Queue Ninja';
  
  next();
}

module.exports = router;
