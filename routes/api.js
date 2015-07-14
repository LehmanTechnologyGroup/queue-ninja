var express     = require('express');
var router      = express.Router();

//TODO: Need to change permissions so that lists marked as public can be retrieved by anyone.

//Models
var UserList   = require('../models/userLists.js');
var User 		= require('../models/user.js');

var DB_ERROR_MESSAGE = "An error occurred while trying to interact with the database";
var USER_PERMISSIONS_ERROR_MESSAGE = "You do not have permission to view or modify lists or items for this user: ";

router.all("/lists/:userId", verifyPermissions)

//List Methods
//Get all lists for a specific user
router.get('/lists/:userId', function(req, res) {
  UserList.find({ userId: req.params.userId}, function(err, lists) {
    if(err) {
      console.log(err);
      var response = {
          "response-status": "ERROR",
          "user-id": req.params.userId,
          "user-lists": lists
      }
      res.json(response);
    } else {
      var response = {
          "response-status": "SUCCESS",
          "user-id": req.params.userId,
          "user-lists": lists
      }
      res.json(response);
    };
  });
});

//Get a specific list for a user
router.get('/lists/:userId/:listId', function(req, res) {
  console.log("Retrieving list with id: " + req.params.listId + " for user with Id: " + req.params.userId);
  
  UserList.find({ _id: req.params.listId, userId: req.params.userId}, function(err, list) {
    if(err) {
      console.log(err);
      var response = {
          "response-status": "ERROR",
          "message": DB_ERROR_MESSAGE
      }
      res.json(response);
    } else {
      var response = {
          "response-status": "SUCCESS",
          "user-id": req.params.userId,
          "user-list": list
      }
      res.json(response);
    }
  });
});

//Delete a list for a user (just mark it as deleted, will run a clean up job every so often to actually remove
router.delete('/lists/:userId/:listId', function(req, res) {
  UserList.findByIdAndUpdate(req.params.listId, { hidden: true}, function(err, list) {
    if(err) {
      console.log("DB Error: " +err);
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

//Add a new list for a user
router.post('/lists/:userId', function(req, res) {
  var newList = new UserList();
  newList.userId = req.user.id;
  newList.name = req.body.name;
  newList.category = req.body.category;
  newList.hidden = false;
  newList.visibleToPublic = req.body.visibleToPublic;

  if(newList == undefined) {
    console.log("newList is undefined");
    var response = {
        "response-status": "ERROR",
        "message": "No data was provided"
    }
    res.json(response);
  }
    
  newList.save(function(err, list) {
    if(err) {
      console.log("DB Error: " + err);
      var response = {
          "response-status": "ERROR",
          "message": DB_ERROR_MESSAGE
      }
      res.json(response);
    
    } else {
      console.log("Saved successfully.");

      var response = {
          "response-status": "SUCCESS",
          "message": "New list created.",
          "list": list
      }
      res.json(response);
    }
  });
});


router.put('/lists/:userId/:listId', function(req, res) {

});

//Copy a list for a specific user
router.copy('/lists/:userId/:listId', function(req, res) {

});

//List Item Methods
router.get('/lists/:userId/:listId/items/:itemId', function(req, res) {

});

router.delete('/lists/:userId/:listId/items/:itemId', function(req, res) {

});

router.post('/lists/:userId/:listId/items/:itemId', function(req, res) {
  UserList.find({ _id: req.params.listId, userId: req.params.userId}, function(err, list) {
    if(err) {
      console.log(err);
      var response = {
          "response-status": "ERROR",
          "message": DB_ERROR_MESSAGE
      }
      res.json(response);
    } else {
      //here?
      var newListItem = new ListItem();
    }


  //or here??
  var newItem = new UserList();
    newList.userId = req.user.id;
    newList.name = req.body.name;
    newList.category = req.body.category;
    newList.hidden = false;
    newList.visibleToPublic = req.body.visibleToPublic;

    if(newList == undefined) {
      console.log("newList is undefined");
      var response = {
          "response-status": "ERROR",
          "message": "No data was provided"
      }
      res.json(response);
    }
      
    newList.save(function(err, list) {
      if(err) {
        console.log("DB Error: " + err);
        var response = {
            "response-status": "ERROR",
            "message": DB_ERROR_MESSAGE
        }
        res.json(response);
      
      } else {
        console.log("Saved successfully.");

        var response = {
            "response-status": "SUCCESS",
            "message": "New list created.",
            "list": list
        }
        res.json(response);
      }
  });
});

router.put('/lists/:userId/:listId/items/:itemId', function(req, res) {

});

router.copy('/lists/:userId/:listId/items/:itemId', function(req, res) {

});


//Utility Methods
function verifyPermissions(req, res, next){
  var error = false;
  var response = {
      "response-status": "ERROR",
      "message": USER_PERMISSIONS_ERROR_MESSAGE + req.params.userId
  }
  
  if(!req.isAuthenticated()) error = true;
  else if(req.params.userId != req.user.id) error = true;
  if(error) {
    console.log("Access attempted for user with insufficient permissions.");
    res.json(response);
  } 
  
  next();  
}

module.exports = router;
