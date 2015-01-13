var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var QueueItem = new Schema({
  name: String, 
  prevItemId: String, 
  nextItemId: String, 
  description: String, 
  imageUrl: String, 
  type: String
});

var UserQueueSchema = new Schema({
  userId: String,
  name: String,
  created: {type: Date, default: Date.now},
  prevListId: String,
  nextListId: String,
  items : [QueueItem],
  hidden: Boolean
});

//Validate object before saving
UserQueueSchema.pre('save', function (next) {
  if(!this.name) next(new Error("Name field on UserQueue cannot be empty"));
    
  next();
});

QueueItem.pre('save', function (next) {
  if(!this.name) next(new Error("Name field on QueueItem cannot be empty"));
    
  next();
});

module.exports = mongoose.model( 'UserQueue', UserQueueSchema );
module.exports = mongoose.model( 'QueueItem', QueueItem);