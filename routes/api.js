var router = require('express').Router();

//Models
var UserQueue   = require('../models/userQueue.js')
var User 		= require('../models/user.js');

var DB_ERROR_MESSAGE = "An error occurred while trying to interact with the database";
var USER_PERMISSIONS_ERROR_MESSAGE = "You do not have permission to view or modify list with id: ";

router.all("/lists/:userId", verifyPermissions)
//List Methods
router.get('/lists/:userId', function(req, res) {
  UserQueue.find({ userId: req.params.userId}, function(err, queues) {
    if(err) {
      console.log(err);
      var response = {
          "response-status": "ERROR",
          "user-id": req.params.userId,
          "user-queues": queues
      }
      res.json(response);
    } else {
      var response = {
          "response-status": "SUCCESS",
          "user-id": req.params.userId,
          "user-queues": queues
      }
      res.json(response);
    };
  });
});

router.get('/lists/:userId/:listId', function(req, res) {
  UserQueue.find({id: req.params.listId, userId: req.params.userId}, function(err, queue) {
    if(err) {
      console.log(err);
      var response = {
          "response-status": "ERROR",
          "message": DB_ERROR_MESSAGE
      }
      res.json(response);
    } else {
      verifyQueuePermissions(req, res, queue);

      var response = {
          "response-status": "SUCCESS",
          "user-id": req.params.userId,
          "user-queue": queue
      }
      res.json(response);
    }
  });
});

router.delete('/lists/:userId/:listId', function(req, res) {
  verifyQueuePermissions(req, res);
  UserQueue.findByIdAndUpdate(req.params.listId, { hidden: true}, function(err, queue) {
    if(err) {
      console.log(err);
      var response = {
          "response-status": "ERROR",
          "message": DB_ERROR_MESSAGE
      }
      res.json(response);
    } else {
      var response =  {
          "response-status": "SUCCESS",
          "message": "List with id " + req.session.passport.user.id + " was successfully removed."
      }
    }
  });
});

router.put('/lists/:userId', function(req, res) {
  var newList = req.body();

  if(newList == undefined) {
    var response = {
        "response-status": "ERROR",
        "message": "No data was provided"
    }
    res.json(response);
  }

  verifyQueuePermissions(req, res, queue);

  UserQueue.save(newList, function(err, queue) {
    if(err) {
      var response = {
          "response-status": "ERROR",
          "message": DB_ERROR_MESSAGE
      }
      res.json(response);
    } else {
      var response = {
          "response-status": "SUCCESS",
          "message": "Save successfull",
          "queue": queue
      }
      res.json(response);
    }
  });
});

router.copy('/lists/:userId/:listId', function(req, res) {

});

//List Item Methods
router.get('/lists/:userId/:listId/items/:itemId', function(req, res) {

});

router.delete('/lists/:userId/:listId/items/:itemId', function(req, res) {

});

router.put('/lists/:userId/:listId/items/:itemId', function(req, res) {

});

router.copy('/lists/:userId/:listId/items/:itemId', function(req, res) {

});

function verifyQueuePermissions(req, res, queue) {
  var queue = queue || {};
  var error = false;
  var response = {
      "response-status": "ERROR",
      "message": USER_PERMISSIONS_ERROR_MESSAGE + req.params.listId
  }

  if(!req.session || !req.session.passport || req.session.passport.user) error = true;
  if(req.params.userId == req.session.passport.user.id) error = true;
  if(queue.userId && queue.userId != userIdParam) error = true;
  
  res.json(response);  
}

function verifyPermissions(req, res, next){
  var error = false;
  var response = {
      "response-status": "ERROR",
      "message": USER_PERMISSIONS_ERROR_MESSAGE + req.session.userId
  }
  
  if(!req.isAuthenticated()) error = true;
  if(req.params.userId != req.session.passport.user.id) error = true;

  if(error) {
    res.json(response);
  } else {
    next();
  }
}

module.exports = router;
