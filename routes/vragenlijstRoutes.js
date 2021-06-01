const express = require('express');
const vragenlijstRouter = express.Router();
const Vragenlijst=require('../models/vragenlijstModel');
const vragenlijstController = require('../controllers/vragenlijstController');
const prefix='/vragenlijsten';

module.exports= function(router,authrouter,adminrouter){

    //middleware
    router.use(function(req,res,next){
        //logging when middleware is handing a request.
        next();
    });

    router.route(prefix)
        .post(vragenlijstController.createVragenlijst)
        .get(vragenlijstController.getAllVragenlijsten);

    router.route(prefix+'/:vragenlijst_id')
        .get(vragenlijstController.getVragenlijstAtId)
        .put(vragenlijstController.updateVragenlijst)
        .delete(vragenlijstController.deleteVragenlijst);
}


