const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const bodyParser = require ('body-parser');
const cors = require('cors');
const config = require('./config/mainconfig');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const{login,refresh}=require('./authenticationMiddleware');


//mongoose promises
mongoose.Promise = global.Promise;
//mongo connect
mongoose.connect(process.env.CONNECTION_STRING);

//successfull connection
mongoose.connection.on("connected",function () {
    console.log("Now connected to " + config.db_nickname);
});
//failed connection
mongoose.connection.on("error",function (err) {
   console.log(
       "Encountered an error \n" +
       " db: " + config.db_nickname +'\n'+
       " connectionstring : " + process.env.CONNECTION_STRING+ '\n'+
       " error : " + err);
});

let corsOptions={
    credentials:true
}

//app usages
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

//routes
let appRoutes = require('./appRoutes');
appRoutes(app);

app.listen(port,function(){
    console.log(config.application_name+' started on port ' + port);
});