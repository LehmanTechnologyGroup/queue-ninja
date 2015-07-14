var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserListSchema = new Schema({
  userId: String,
  name: String,
  category: String,
  created: {type: Date, default: Date.now},
  items : [ListItem],
  hidden: Boolean,
  visibleToPubilc: Boolean
}, { collection: 'userLists' });

//Validate object before saving
UserListSchema.pre('save', function (next) {
  if(!this.name) next(new Error("Name field on UserList cannot be empty"));
    
  next();
});

var ListItem = new Schema({
  name: String, 
  prevItemId: String, 
  nextItemId: String, 
  description: String, 
  imageUrl: String, 
  type: String
});

ListItem.pre('save', function (next) {
  if(!this.name) next(new Error("Name field on ListItem cannot be empty"));
    
  next();
});

module.exports = mongoose.model( 'ListItem', ListItem);
module.exports = mongoose.model( 'UserList', UserListSchema );