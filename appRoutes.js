//importing core
const { model } = require('mongoose');
const express = require('express');
const bodyParser = require ('body-parser');
const { Router } = require('express');
const { json } = require('body-parser');
const authmiddleware = require('./authenticationMiddleware');


//defining main routers
const router = express.Router(); //main router 
const authrouter = express.Router(); //router for authenticated routes?
const adminrouter = express.Router();//routes for admin only

//defining subrouters
const vakRoutes= require('./routes/vakRoutes');
const gebruikerstypeRoutes= require('./routes/gebruikerstypeRoutes');
const gebruikerRoutes = require('./routes/gebruikerRoutes');
const klasgroepRoutes = require('./routes/klasgroepRoutes');
const vragenlijstRoutes = require('./routes/vragenlijstRoutes');
const reactieRoutes = require('./routes/reactieRoutes');

const loginRoutes = require('./routes/loginRoutes');
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

    authrouter.use(function(req,res,next){
        console.log('authrouterMiddleware : incomming request detected');
        authmiddleware.verifyToken(req,res,next);
    });

    adminrouter.use(function(req,res,next){
        console.log('adminmiddleware : incomming request detected');
        authmiddleware.verifyTokenAdmin(req,res,next);
    });

    //testroute
    router.get('/',function(req,res){
        res.json({message:'api is on'});
    });

    //login route
    //router.post('/login',tokenController.login);
 /  ///router.post('/refresh',loginController.refresh);
    //refresh route

    //Main routes
    vakRoutes(router);
    gebruikerstypeRoutes(router,authrouter,adminrouter);
    gebruikerRoutes(router);
    klasgroepRoutes(router);
    vragenlijstRoutes(router);
    reactieRoutes(router);
    loginRoutes(router);

    app.use(routerprefix,router);
    app.use(routerprefix,authrouter);
    app.use(routerprefix,adminrouter);
}