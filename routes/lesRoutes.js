const express = require('express');
const Les = require('../models/lesModel');
const lesController = require('../controllers/lesController');

//defining pathprefix
const lesrouteprefix="/lessen";

module.exports= function (router){
    
    

    //middleware for debugging purposes
    router.use(function(req,res,next){
        //logging when middleware is handing a request.
        console.log('middleware : request is for "lessen"');
        next();
    });

//Lessen
    //routes that end in /les
    router.route(lesrouteprefix)
        //create a les
        .post(lesController.createLes)
        //get all lessen
        .get(lesController.getAllLessen);

    //routes that end in /lessen/:les_id
    router.route(lesrouteprefix+'/:les_id')
        //grab les at id
        .get(lesController.getLesAtId)
        //update les at id
        .put(lesController.updateLes)
    
        //delete les at id
        .delete(lesController.deleteLes);
}


