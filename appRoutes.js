//importing core
const { model } = require('mongoose');
const express = require('express');
const bodyParser = require ('body-parser');
const { Router } = require('express');

const { json } = require('body-parser');

//defining models
const User = require('./models/userModel');


//defining main routers
const router = express.Router(); //main router 

//defning subrouters
const lesRoutes= require('./routes/lesRoutes');
const usertypeRoutes= require('./routes/usertypeRoutes');
const userRoutes = require('./routes/userRoutes');

//defining pathprefix
const routerprefix = '/api';


module.exports = function (app){
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    //middleware to use for all requests
    router.use(function(req,res,next){
        //logging when middleware is handing a request.
        console.log('middleware: incomming request detected');
        next();
    });

    //testroute
    router.get('/',function(req,res){
        res.json({message:'api is on'});
    });

    //more routes
    lesRoutes(router);
    usertypeRoutes(router);
    userRoutes(router);

    app.use(routerprefix,router);
    
    

}