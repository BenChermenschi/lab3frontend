const express = require('express');
const Les = require('../models/lesModel');
const lesController = require('../controllers/lesController');
const lesrouteprefix="/lessen";

module.exports= function (router){
    
    //middleware for debugging purposes
    router.use(function(req,res,next){
        //logging when middleware is handing a request.
        console.log('middleware : request is for "lessen"');
        next();
    });

    router.route(lesrouteprefix)
        .post(lesController.createLes)
        .get(lesController.getAllLessen);

    router.route(lesrouteprefix+'/:les_id')
        .get(lesController.getLesAtId)
        .put(lesController.updateLes)
        .delete(lesController.deleteLes);
}


