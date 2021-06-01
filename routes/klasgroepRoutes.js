const express = require('express');
const Klasgroep = require('../models/klasgroepModel');
const klasgroepController = require('../controllers/klasgroepController');
const prefix="/klasgroepen";

module.exports= function (router,authrouter,adminrouter){
    
    //middleware for debugging purposes
    router.use(function(req,res,next){
        //logging when middleware is handing a request.
        next();
    });

    router.route(prefix)
        .post(klasgroepController.createKlasgroep)
        .get(klasgroepController.getAllKlasgroepen);

    router.route(prefix+'/:klasgroep_id')
        .get(klasgroepController.getKlasgroepAtId)
        .put(klasgroepController.updateKlasgroep)
        .delete(klasgroepController.deleteKlasgroep);
}