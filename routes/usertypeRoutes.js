const express= require('express');
const usertypeController = require('../controllers/usertypeController');
const Usertype = require('../models/usertypeModel');
const usertyperouteprefix="/usertypes";

module.exports=function(router){

    //middleware for debugging
    router.use(function(req,res,next){
        console.log('middleware : request is for "usertypes"');
        next();
    });

    router.route(usertyperouteprefix)
        .post(usertypeController.createUsertype)
        .get(usertypeController.getAllUsertypes);

    router.route(usertyperouteprefix+'/:usertype_id')
        .get(usertypeController.getUsertypeAtId)
        .put(usertypeController.updateUsertype)
        .delete(usertypeController.deleteUsertype);
    
}  