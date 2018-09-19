
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
userModel = mongoose.model('userModel');
var validator = require('validator');
var config = require('../models/config');
var waterfall = require('async-waterfall');
var async = require('async');
const jwt = require('jsonwebtoken');




router.post('/signup', function (req, res) {
  var finalResponse = {};
  finalResponse.userData = {};
  var userObj = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  }
  if (!userObj.firstName || !userObj.lastName || !userObj.email || !userObj.password) {
    res.json({
      code: 400,
      data: {},
      message: "Required Fields is missing"
    });
  } else if (userObj.email && !validator.isEmail(userObj.email)) {
    res.json({
      code: 400,
      data: {},
      message: "Invalid Email"
    });
  } else {
    waterfall([
      function (callback) { //Check for already exist Email of user
        userModel.existCheck(userObj.email.trim(), '', function (err, emailExist) {
          if (err) {
            callback(err, false);
          } else {
            if (!emailExist) {
              res.json({
                code: 400,
                data: {},
                message: "Email Already Exist"
              });
            } else {
              callback(null, finalResponse);
            }
          }
        });
      },
      function (finalResponse, callback) { //Save User data
        var obj = {
          firstName: userObj.firstName,
          lastName: userObj.lastName,
          email: userObj.email.toLowerCase(),
          password: userObj.password
        };

        var userRecord = new userModel(obj);
        userRecord.save(function (err, userData) {
          if (err) {
            callback(err, false);
          } else {
            finalResponse.userData = userData;
            callback(null, finalResponse);
          }
        });

      }
    ],
      function (err, data) {
        if (err) {
          res.json({
            code: 400,
            data: {},
            message: "Internal Error"
          });
        } else {
          res.json({
            code: 200,
            data: data,
            message: "User Created Succussfully"
          });
        }
      });

  }
})






router.post('/login', function (req, res) {
  var finalResponse = {};
  var condition = {};
  finalResponse.userData = {}
  var userObj = {
    email: req.body.email,
    password: req.body.password
  };
  if (!userObj.email || !userObj.password) {
    res.json({
      code: 400,
      data: {},
      message: "Required Fields is missing"
    });
  } else {
    waterfall([
      function (callback) {
        condition.email = userObj.email;
        condition.password = userObj.password;
        userModel.findOne(condition).exec(function (err, userData) {
          if (err) {
            callback(err, false);
          } else {
            if (!userData) {
              res.json({
                code: 406,
                data: {},
                message: "You have entered Invalid Username and Password"
              });
            } else {
              const JwtToken = jwt.sign({
                email: userData.email,
                _id: userData._id
              },
                'secret',
                {
                  expiresIn: 60 * 60 * 24 * 15
                });
              finalResponse.token = JwtToken;
              finalResponse.userData = userData;
              callback(null, finalResponse);
            }
          }
        })
      }
    ], function (err, data) {
      if (err) {
        res.json({
          code: 400,
          data: {},
          message: "Internal Error"
        });
      } else {
        res.json({
          code: 200,
          data: data,
          message: "Login Successfully"
        });
      }
    });
  }
});

module.exports = router;

