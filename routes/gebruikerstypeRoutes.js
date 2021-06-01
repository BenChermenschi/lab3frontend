const express= require('express');
const gebruikerstypeController = require('../controllers/gebruikerstypeController');
const Gebruikerstype = require('../models/gebruikerstypeModel');
const prefix="/gebruikerstypes";

module.exports=function(router,authrouter,adminrouter){

    //middleware for debugging
    router.use(function(req,res,next){
        next();
    });
    //public
    authrouter.route(prefix)
        .get(gebruikerstypeController.getAllGebruikerstypes);

    authrouter.route(prefix+'/:gebruikerstype_id')
        .get(gebruikerstypeController.getGebruikerstypeAtId);
    //private
    adminrouter.route(prefix)
    .post(gebruikerstypeController.createGebruikerstype);

    adminrouter.route(prefix+'/:gebruikerstype_id')
    .put(gebruikerstypeController.updateGebruikerstype)
        .delete(gebruikerstypeController.deleteGebruikerstype);
}  