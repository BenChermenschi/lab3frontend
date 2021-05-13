const express = require('express');
const Vak = require('../models/vakModel');
const vakController = require('../controllers/vakController');
const vakrouteprefix="/vakken";

module.exports= function (router){
    
    //middleware for debugging purposes
    router.use(function(req,res,next){
        //logging when middleware is handing a request.
        next();
    });

    router.route(vakrouteprefix)
        .post(vakController.createVak)
        .get(vakController.getAllVakken);

    router.route(vakrouteprefix+'/:vak_id')
        .get(vakController.getVakAtId)
        .put(vakController.updateVak)
        .delete(vakController.deleteVak);
}


