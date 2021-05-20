const express = require('express');
const Reactie = require('../models/reactieModel');
const reactieController = require('../controllers/reactieController');
const reactierouteprefix="/reacties";

module.exports= function (router){
    
    //middleware for debugging purposes
    router.use(function(req,res,next){
        //logging when middleware is handing a request.
        next();
    });

    router.route(reactierouteprefix)
        .post(reactieController.createReactie)
        .get(reactieController.getAllReacties);

    router.route(reactierouteprefix+'/:reactie_id')
        .get(reactieController.getReactieAtId)
        .put(reactieController.updateReactie)
        .delete(reactieController.deleteReactie);
}