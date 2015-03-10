'use strict';

var _ = require('lodash');
var Signup = require('./signup.model');

// Get list of signups
exports.index = function(req, res) {
  Signup.find(function (err, signups) {
    if(err) { return handleError(res, err); }
    return res.json(200, signups);
  });
};

// Get a single signup
exports.show = function(req, res) {
  Signup.findById(req.params.id, function (err, signup) {
    if(err) { return handleError(res, err); }
    if(!signup) { return res.send(404); }
    return res.json(signup);
  });
};

// Creates a new signup in the DB.
exports.create = function(req, res) {
  Signup.create(req.body, function(err, signup) {
    if(err) { return handleError(res, err); }
    return res.json(201, signup);
  });
};

// Updates an existing signup in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Signup.findById(req.params.id, function (err, signup) {
    if (err) { return handleError(res, err); }
    if(!signup) { return res.send(404); }
    var updated = _.merge(signup, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, signup);
    });
  });
};

// Deletes a signup from the DB.
exports.destroy = function(req, res) {
  Signup.findById(req.params.id, function (err, signup) {
    if(err) { return handleError(res, err); }
    if(!signup) { return res.send(404); }
    signup.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}