var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb:')
app.get('/ping',function(req,res){
    res.send({ping:'Server is alive yahoo!'});
});

app.get('/ping/:id',function(req, res){
    res.send({ping:'hello this is the server and i got ' + req.params.id});
});

app.listen(3000);
console.log('Listen on port 3000...');