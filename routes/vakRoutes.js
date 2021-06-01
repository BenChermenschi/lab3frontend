const express = require('express');
const Vak = require('../models/vakModel');
const vakController = require('../controllers/vakController');
const prefix="/vakken";


module.exports= function (router,authrouter,adminrouter){
    
    //middleware for debugging purposes
    router.use(function(req,res,next){
        //logging when middleware is handing a request.
        next();
    });

    authrouter.route(prefix)
        .get(vakController.getAllVakken);

    authrouter.route(prefix+'/:vak_id')
        .get(vakController.getVakAtId);

    adminrouter.route(prefix)
        .post(vakController.createVak);

    adminrouter.route(prefix+'/:vak_id')
        .put(vakController.updateVak)
        .delete(vakController.deleteVak);
}


