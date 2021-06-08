const express = require('express');
const Vak = require('../models/vakModel');
const vakController = require('../controllers/vakController');
const prefix="/vakken";
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
            vakController.getAllVakken]);

    router.route(prefix+'/:vak_id')
        .get([
            authmiddleware.verifyToken,
            vakController.getVakAtId]);

    router.route(prefix)
        .post([
            authmiddleware.verifyTokenAdmin,
            vakController.createVak]);

    router.route(prefix+'/:vak_id')
        .put([
            authmiddleware.verifyTokenAdmin,
            vakController.updateVak])
        .delete([
            authmiddleware.verifyTokenAdmin,
            vakController.deleteVak]);
            */


    //AUTHLESS
    router.route(prefix)
        .get([
           
            vakController.getAllVakken]);

    router.route(prefix+'/:vak_id')
        .get([
           
            vakController.getVakAtId]);

    router.route(prefix)
        .post([
            
            vakController.createVak]);

    router.route(prefix+'/:vak_id')
        .put([
            
            vakController.updateVak])
        .delete([
            
            vakController.deleteVak]);
}


