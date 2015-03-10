'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SignupSchema = new Schema({
  name: String,
  email: String,
  loanAmount: Number,
  loanPurpose: String,
  creditScore: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Signup', SignupSchema);