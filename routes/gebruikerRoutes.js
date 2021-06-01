const express=require('express');
const Gebruiker=require('../models/gebruikerModel');
const gebruikerController = require('../controllers/gebruikerController');
const prefix="/gebruikers";

module.exports=function(router,authrouter,adminrouter){

    //middleware
    router.use(function(req,res,next){
        //do type and other validations here
        next();
    });
    
   adminrouter.route(prefix)
        .get(gebruikerController.getAllGebruikers);
    
    
    authrouter.route(prefix+ '/email')
        .get(gebruikerController.getGebruikerAtEmail);

       // router.route(gebruikerroutepathprefix+ '/pass').get(gebruikerController.checkWachtwoord);

    
    authrouter.route(prefix+'/:gebruiker_id')
        .get(gebruikerController.getGebruikerAtId);

    //private

    //admin
    adminrouter.route(prefix)
        .post(gebruikerController.createGebruiker);
    
    adminrouter.route(prefix+'/:gebruiker_id')
        .put(gebruikerController.updateGebruiker)
        .delete(gebruikerController.deleteGebruiker)

}