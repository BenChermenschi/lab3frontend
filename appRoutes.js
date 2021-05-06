//importing models
const Survey = require('./models/surveyModel');
const User = require('./models/userModel');
const Usertype = require('./models/usertypeModel');
const Les = require('./models/lesModel');
const { model } = require('mongoose');
const express = require('express');
const bodyParser = require ('body-parser');
const { Router } = require('express');


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
    router.route('/lessen')

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
        }) //Do not put a ';' here, since technically this is all one line

        //get all lessen
        .get(function(req,res){
            Les.find(function(err,lessen){
                if(err){
                    res.send(err);
                }
                res.json(lessen);
            });
        });

    //routes that end in /lessen/:les_id
    router.route('/lessen/:les_id')
    
        //grab les at id
        .get(function(req,res){
            Les.findById(req.params.les_id,function(err,les){
                if (err){
                    res.send(err);
                }
                res.json(les);
            });
        })

        //update les at id
        .put(function(req,res){
            Les.findById(req.params.les_id,function(err,les){
                if(err){
                    res.send(err);
                }
                console.log('adding new name');
                les.naam= req.body.naam;
                console.log(les.naam);
                les.save(function(err){
                    if(err){
                        res.send(err);
                    }
                    res.json({message:'Les updated!'});
                });
            });
        })
    
        //delete les at id
        .delete(function(req,res){
            Les.remove({_id:req.params.les_id},function(err,les){
                if (err){
                    res.send(err);
                }
                res.json({message: 'Les successfully deleted'});
            });
        });

    //Routes that end in /usertypes
     router.route('/usertypes')
        
        //create a les
        .post(function(req,res){
            var usertype = new Usertype(); //create new instance of Les model
            usertype.naam = req.body.naam; //set lesname

            //save and check for errors
            usertype.save(function(err){
                if(err){
                    res.send(err);
                }
                res.json({message:'usertype created'});
            });
        }) //Do not put a ';' here, since technically this is all one line

        //get all usertypes
        .get(function(req,res){
            Usertype.find(function(err,usertypes){
                if(err){
                    res.send(err);
                }
                res.json(usertypes);
            });
        });

    

    //route registration
    app.use(routerprefix,router);



    
    

}