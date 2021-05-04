//importing models
const Survey = require('./models/surveyModel');
const User = require('./models/userModel');
const Usertype = require('./models/usertypeModel');
const Les = require('./models/lesModel');
const { model } = require('mongoose');
const express = require('express');
const bodyParser = require ('body-parser');


module.exports = function (app){
    //setting path prefix
    const routerprefix = '/api';

    //defining routers
   // const surveyRouter = require('./routes/surveyRoutes');
   // const userRouter = require('./routes/userRoutes');
   // const usertypeRouter = require('./routes/usertypeRoutes');
    //const lesRouter = require('./routes/lesRoutes');

    //teaching the application the routes
   // app.use(routerprefix+ '/survey',surveyRouter);
    // app.use(routerprefix+ '/user',userRouter);
    // app.use(routerprefix+ '/usertype',usertypeRouter);
    //app.use(routerprefix+ '/les',lesRouter);


    //API ROUTES
        //test route
    var router = express.Router();


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    //middleware to use for all requests
    router.use(function(req,res,next){
        //logging when middleware is handing a request.
        console.log('middleware doing stuff');
        next();
    });

    router.get('/',function(req,res){
        res.json({message:'api is on'});
    });

    //more routes

    //routes that end in /les
    router.route('/les')

        //create a les
        .post(function(req,res){
            var les = new Les(); //create new instance of Les model
            les.naam = req.body.naam; //set lesname

            //save and check for errors
            les.save(function(err){
                if(err){
                    res.send(err);
                }
                res.json({message:'les created'});
            });
        });





    //route registration
    app.use(routerprefix,router);



    
    

}