var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserQueueSchema = new Schema({
  userId: String,
  name: String,
  created: Date,
  orderPosition: Number,
  items : [{ name: String, orderPosition: Number, description: String, imageUrl: String, type: String}],
  hidden: Boolean
});

module.exports = mongoose.model( 'UserQueue', UserQueueSchema );;