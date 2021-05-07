const express=require('express');
const User=require('../models/userModel');
const userController = require('../controllers/userController');
const userroutepathprefix="/users";

module.exports=function(router){

    //middleware
    router.use(function(req,res,next){
        //do type and other validations here
        next();
    });

   router.route(userroutepathprefix)
        .post(userController.createUser)
        .get(userController.getAllUsers);//Extremely unsafe
    
    router.route(userroutepathprefix+'/:user_id')
        .get(userController.getUserAtId)
        .put(userController.updateUser);
        
}