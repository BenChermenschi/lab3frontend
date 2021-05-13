const express= require('express');
const gebruikerstypeController = require('../controllers/gebruikerstypeController');
const Gebruikerstype = require('../models/gebruikerstypeModel');
const gebruikerstyperouteprefix="/gebruikerstypes";

module.exports=function(router){

    //middleware for debugging
    router.use(function(req,res,next){
        next();
    });

    router.route(gebruikerstyperouteprefix)
        .post(gebruikerstypeController.createGebruikerstype)
        .get(gebruikerstypeController.getAllGebruikerstypes);

    router.route(gebruikerstyperouteprefix+'/:gebruikerstype_id')
        .get(gebruikerstypeController.getGebruikerstypeAtId)
        .put(gebruikerstypeController.updateGebruikerstype)
        .delete(gebruikerstypeController.deleteGebruikerstype);
    
}  