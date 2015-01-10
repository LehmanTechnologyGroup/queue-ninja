var router = require('express').Router();

//Models
var UserQueue   = require('../models/userQueue.js')
var User 		= require('../models/user.js');

// List Methods
router.all('/:userId', verifyPermissions)

router.get('/:userId/lists', function(req, res) {
  
 
 res.json(responseObject);
});

router.get('/:userId/:listId', function(req, res) {
  res.json(responseObject);
});

router.delete('/:userId/:listId', function(req, res) {
  res.json(responseObject);
});

router.put('/:userId/', function(req, res) {
  res.json(responseObject);
});

router.copy('/:userId/:listId', function(req, res) {
  res.json(responseObject);
});

router.move('/:userId/:listId', function(req, res) {
  res.json(responseObject);
});

// List Item Methods
router.get('/:userId/:listId/:itemId', function(req, res) {
  res.json(responseObject);
});

router.delete('/:userId/:listId/:itemId', function(req, res) {
  res.json(responseObject);
});

router.put('/:userId/:listId/:itemId', function(req, res) {
  res.json(responseObject);
});

router.copy('/:userId/:listId/:itemId', function(req, res) {
  res.json(responseObject);
});

router.move('/:userId/:listId/:itemId', function(req, res) {
  res.json(responseObject);
});

function verifyPermissions(){
 
}

module.exports = router;
