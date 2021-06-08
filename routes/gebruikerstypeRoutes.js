const express= require('express');
const gebruikerstypeController = require('../controllers/gebruikerstypeController');
const Gebruikerstype = require('../models/gebruikerstypeModel');
const prefix="/gebruikerstypes";
const authmiddleware = require('../authenticationMiddleware');

module.exports=function(router){

    //middleware for debugging
    router.use(function(req,res,next){
        next();
    });


/*
    //public
    router.route(prefix)
        .get([
            authmiddleware.verifyToken,
            gebruikerstypeController.getAllGebruikerstypes]);

    router.route(prefix+'/:gebruikerstype_id')
        .get([
            authmiddleware.verifyToken,
            gebruikerstypeController.getGebruikerstypeAtId]);
    //private
    router.route(prefix)
    .post([
        authmiddleware.verifyTokenAdmin,
        gebruikerstypeController.createGebruikerstype]);

    router.route(prefix+'/:gebruikerstype_id')
    .put([
        authmiddleware.verifyTokenAdmin,
        gebruikerstypeController.updateGebruikerstype])
        .delete([
            authmiddleware.verifyTokenAdmin,
            gebruikerstypeController.deleteGebruikerstype]);
*/


    //AUTHLESS


    //public
    router.route(prefix)
        .get([
         
            gebruikerstypeController.getAllGebruikerstypes]);

    router.route(prefix+'/:gebruikerstype_id')
        .get([
           
            gebruikerstypeController.getGebruikerstypeAtId]);
    //private
    router.route(prefix)
    .post([
     
        gebruikerstypeController.createGebruikerstype]);

    router.route(prefix+'/:gebruikerstype_id')
    .put([
       
        gebruikerstypeController.updateGebruikerstype])
        .delete([
        
            gebruikerstypeController.deleteGebruikerstype]);


}  