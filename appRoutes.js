//importing core
const { model } = require('mongoose');
const express = require('express');
const bodyParser = require ('body-parser');
const { Router } = require('express');
const bcrypt = require('bcryptjs');
const { json } = require('body-parser');

//defining models
const Survey = require('./models/surveyModel');
const User = require('./models/userModel');
const Usertype = require('./models/usertypeModel');
const Les = require('./models/lesModel');

//defining main routers
const router = express.Router(); //main router 

//defning subrouters
const lesRoutes= require('./routes/lesRoutes');
const usertypeRoutes= require('./routes/usertypeRoutes');

//defining pathprefix
const routerprefix = '/api';


module.exports = function (app){
    

   // const surveyRouter = require('./routes/surveyRoutes');
   // const userRouter = require('./routes/userRoutes');
   // const usertypeRouter = require('./routes/usertypeRoutes');
    //const lesRouter = require('./routes/lesRoutes');


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
    


    
    //Routes that end in /users
    router.route('/users')
        
    //create a user
    .post(function(req,res,next){
        var saltrounds = 10; //defines the level of encryption, the higher the number the more encrypted but also the slower the application.
         //encrypting the password
         bcrypt.hash(req.body.wachtwoord,saltrounds).then(hash=>{
            var user = new User(); //create new instance of user model
           
            //setting the fields
            user.naam = req.body.naam; //set username
            user.email = req.body.email;
            console.log('usertype : ');
            console.log(req.body.usertype);
            user.wachtwoord=hash;

            //save and check for errors
            user.save().then(result=>{
                if(!result){
                    return res.status(500).json({
                        message:"error creating user"
                    })
                }
                res.json({message:'user created'});
            });
            
        });


        
        
       

        

         

       

       
    }) //Do not put a ';' here, since technically this is all one line
    

    //route registration
    app.use(routerprefix,router);
    
    

}