const express = require('express');
const vragenlijstRouter = express.Router();
const Vragenlijst=require('../models/vragenlijstModel');
const vragenlijstController = require('../controllers/vragenlijstController');
const vragenlijstrouteprefix='/vragenlijsten';

module.exports= function(router){

    //middleware
    router.use(function(req,res,next){
        //logging when middleware is handing a request.
        next();
    });

    router.route(vragenlijstrouteprefix)
        .post(vragenlijstController.createVragenlijst)
        .get(vragenlijstController.getAllVragenlijsten);

    router.route(vragenlijstrouteprefix+'/:vragenlijst_id')
        .get(vragenlijstController.getVragenlijstAtId)
        .put(vragenlijstController.updateVragenlijst)
        .delete(vragenlijstController.deleteVragenlijst);
}


