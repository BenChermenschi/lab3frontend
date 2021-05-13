const express = require('express');
const Klasgroep = require('../models/klasgroepModel');
const klasgroepController = require('../controllers/klasgroepController');
const klasgroeprouteprefix="/klasgroepen";

module.exports= function (router){
    
    //middleware for debugging purposes
    router.use(function(req,res,next){
        //logging when middleware is handing a request.
        next();
    });

    router.route(klasgroeprouteprefix)
        .post(klasgroepController.createKlasgroep)
        .get(klasgroepController.getAllKlasgroepen);

    router.route(klasgroeprouteprefix+'/:klasgroep_id')
        .get(klasgroepController.getKlasgroepAtId)
        .put(klasgroepController.updateKlasgroep)
        .delete(klasgroepController.deleteKlasgroep);
}