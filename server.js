const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const bodyParser = require ('body-parser');
const cors = require('cors');
const config = require('./config/mainconfig');

//mongoose promises
mongoose.Promise = global.Promise;
//mongo connect
mongoose.connect(config.db,{useMongoClient:true});

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