
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

require('../models/userModel');


var uri = 'mongodb://localhost:27017/iPrimedApp';


mongoose.connect(uri,{}, function(error) {
  if(error){
    console.log('connection failed!')
  }else{
    console.log("Database connected successfully!");
  }
});