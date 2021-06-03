const express = require('express');
const vragenlijstRouter = express.Router();
const Vragenlijst=require('../models/vragenlijstModel');
const vragenlijstController = require('../controllers/vragenlijstController');
const prefix='/vragenlijsten';
const authmiddleware = require('../authenticationMiddleware');

module.exports= function(router){

    //middleware
    router.use(function(req,res,next){
        //logging when middleware is handing a request.
        next();
    });

    router.route(prefix)
        .post([
            authmiddleware.verifyToken,
            vragenlijstController.createVragenlijst])
        .get([
            authmiddleware.verifyToken,
            vragenlijstController.getAllVragenlijsten]);


    router.route(prefix+'/gebruiker')
            .get([
                authmiddleware.verifyToken,
                vragenlijstController.getVragenlijstenByGebruikersId]);

    router.route(prefix+'/:vragenlijst_id')
        .get([
            authmiddleware.verifyToken,
            vragenlijstController.getVragenlijstAtId])
        .put([
            authmiddleware.verifyToken,
            vragenlijstController.updateVragenlijst])
        .delete([
            authmiddleware.verifyToken,
            vragenlijstController.deleteVragenlijst]);

    
}


