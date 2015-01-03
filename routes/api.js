var router = require('express').Router();

//List Methods
router.get('/api/:userId/lists', function(req, res) {
  res.json(responseObject);
});

router.get('/api/:userId/:listId', function(req, res) {
  res.json(responseObject);
});

router.delete('/api/:userId/:listId', function(req, res) {
  res.json(responseObject);
});

router.put('/api/:userId/', function(req, res) {
  res.json(responseObject);
});

router.copy('/api/:userId/:listId', function(req, res) {
  res.json(responseObject);
});

router.move('/api/:userId/:listId', function(req, res) {
  res.json(responseObject);
});

//List Item Methods
router.get('/api/:userId/:listId/:itemId', function(req, res) {
  res.json(responseObject);
});

router.delete('/api/:userId/:listId/:itemId', function(req, res) {
  res.json(responseObject);
});

router.put('/api/:userId/:listId/:itemId', function(req, res) {
  res.json(responseObject);
});

router.copy('/api/:userId/:listId/:itemId', function(req, res) {
  res.json(responseObject);
});

router.move('/api/:userId/:listId/:itemId', function(req, res) {
  res.json(responseObject);
});

module.exports = router;
