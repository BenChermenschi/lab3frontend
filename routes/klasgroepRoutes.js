const express = require('express');
const Klasgroep = require('../models/klasgroepModel');
const klasgroepController = require('../controllers/klasgroepController');
const prefix="/klasgroepen";
const authmiddleware = require('../authenticationMiddleware');

module.exports= function (router){
    
    //middleware for debugging purposes
    router.use(function(req,res,next){
        //logging when middleware is handing a request.
        next();
    });


    /*
    router.route(prefix)
        .get([
            authmiddleware.verifyToken,
            klasgroepController.getAllKlasgroepen]);

    router.route(prefix+'/:klasgroep_id')
        .get([
            authmiddleware.verifyToken,
            klasgroepController.getKlasgroepAtId]);

    router.route(prefix)
    .post([
        authmiddleware.verifyTokenAdmin,
        klasgroepController.createKlasgroep]);

    router.route(prefix+'/:klasgroep_id')
        .put([
            authmiddleware.verifyTokenAdmin,
            klasgroepController.updateKlasgroep])
        .delete([
            authmiddleware.verifyTokenAdmin,
            klasgroepController.deleteKlasgroep]);
*/


    //AUTHLESS
    router.route(prefix)
    .get([
        
        klasgroepController.getAllKlasgroepen]);

router.route(prefix+'/:klasgroep_id')
    .get([
        
        klasgroepController.getKlasgroepAtId]);

router.route(prefix)
.post([
    
    klasgroepController.createKlasgroep]);

router.route(prefix+'/:klasgroep_id')
    .put([
       
        klasgroepController.updateKlasgroep])
    .delete([
        
        klasgroepController.deleteKlasgroep]);


}