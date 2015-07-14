var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var UserPreferencesSchema = new Schema({
  userId: String,
  mobileAlerts : Boolean,
  email: Boolean
});

module.exports = mongoose.model( 'UserPreferencesSchema', UserPreferencesSchema );
