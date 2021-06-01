const express= require('express');
const gebruikerstypeController = require('../controllers/gebruikerstypeController');
const Gebruikerstype = require('../models/gebruikerstypeModel');
const gebruikerstyperouteprefix="/gebruikerstypes";

module.exports=function(router,authrouter){

    //middleware for debugging
    router.use(function(req,res,next){
        next();
    });
    //public
    router.route(gebruikerstyperouteprefix)
        .get(gebruikerstypeController.getAllGebruikerstypes);

    router.route(gebruikerstyperouteprefix+'/:gebruikerstype_id')
        .get(gebruikerstypeController.getGebruikerstypeAtId);
    //private
    authrouter.route(gebruikerstyperouteprefix)
    .post(gebruikerstypeController.createGebruikerstype);

    authrouter.route(gebruikerstyperouteprefix+'/:gebruikerstype_id')
    .put(gebruikerstypeController.updateGebruikerstype)
        .delete(gebruikerstypeController.deleteGebruikerstype);
}  