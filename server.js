let express = require('express');
let app = express();
let mongoose = require('mongoose');
let port = process.env.PORT || 3000;
let bodyParser = require ('body-parser');
let cors = require('cors');
let config = require('./config/mainconfig');


/*
Testing the server.js

app.get('/ping',function(req,res){
    res.send({ping:'Server is alive yahoo!'});
});

app.get('/ping/:id',function(req, res){
    res.send({ping:'hello this is the server and i got ' + req.params.id});
});

*/



//mongoose promises
mongoose.Promise = global.Promise;
//mongo connect
mongoose.connect(config.db,{useMongoClient:true});

//output of connections
//successfull connection
mongoose.connection.on("connected",function () {
    console.log("Now connected to " + config.db_nickname);
});
//failed connection
mongoose.connection.on("error",function (err) {
   console.log(
       "Encountered an error \n" +
       " db: " + config.db_nickname +'\n'+
       " connectionstring : " + config.db+ '\n'+
       " error : " + err);
});

//further setup

//app usages
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//routes
let appRoutes = require('./appRoutes');
appRoutes(app);

app.listen(port,function(){
    console.log(config.application_name+' started on port ' + port);
});