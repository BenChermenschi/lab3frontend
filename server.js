var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('');
var db= mongoose.connection;

/*
Testing the server.js

app.get('/ping',function(req,res){
    res.send({ping:'Server is alive yahoo!'});
});

app.get('/ping/:id',function(req, res){
    res.send({ping:'hello this is the server and i got ' + req.params.id});
});

*/



app.listen(3000);
console.log('Listen on port 3000...');

db.on('error', function callback () {
    console.log("Connection error");
  });
  
  db.once('open', function callback () {
    console.log("Mongo working!");
  });