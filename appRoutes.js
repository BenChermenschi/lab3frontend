//importing models
const Survey = require('./models/surveyModel');
const User = require('./models/userModel');
const Usertype = require('./models/usertypeModel');
const Les = require('./models/lesModel');
const { model } = require('mongoose');
const express = require('express');

module.exports = function (app){
    //setting path prefix
    const routerprefix = '/api';

    //defining routers
   // const surveyRouter = require('./routes/surveyRoutes');
   // const userRouter = require('./routes/userRoutes');
   // const usertypeRouter = require('./routes/usertypeRoutes');
    const lesRouter = require('./routes/lesRoutes');

    //teaching the application the routes
   // app.use(routerprefix+ '/survey',surveyRouter);
    // app.use(routerprefix+ '/user',userRouter);
    // app.use(routerprefix+ '/usertype',usertypeRouter);
    //app.use(routerprefix+ '/les',lesRouter);


    //API ROUTES
        //test route
    var router = express.Router();

    router.get('/',function(req,res){
        res.json({message:'api is on'});
    });

    //more routes


    //route registration
    app.use(routerprefix,router);



    
    

}