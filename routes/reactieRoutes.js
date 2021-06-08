const express = require('express');
const Reactie = require('../models/reactieModel');
const reactieController = require('../controllers/reactieController');
const prefix="/reacties";
const authmiddleware = require('../authenticationMiddleware');

module.exports= function (router){
    
    //middleware for debugging purposes
    router.use(function(req,res,next){
        //logging when middleware is handing a request.
        next();
    });
/*
    router.route(prefix)
        .post(reactieController.createReactie)
        .get(reactieController.getAllReacties);
    
    router.route(prefix+'/vragenlijst')
        .get([
            authmiddleware.verifyToken,
            reactieController.getReactieByVragenlijst]);

    router.route(prefix+'/:reactie_id')
        .get(reactieController.getReactieAtId)
        ;
*/
        /*.put(reactieController.updateReactie)
        .delete(reactieController.deleteReactie)*/

    //AUTHLESS
    router.route(prefix)
    .post(reactieController.createReactie)
    .get(reactieController.getAllReacties);

router.route(prefix+'/vragenlijst')
    .get([
        
        reactieController.getReactieByVragenlijst]);

router.route(prefix+'/:reactie_id')
    .get(reactieController.getReactieAtId)
    ;

    /*.put(reactieController.updateReactie)
    .delete(reactieController.deleteReactie)*/

    
}