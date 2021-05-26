const express=require('express');
const Gebruiker=require('../models/gebruikerModel');
const gebruikerController = require('../controllers/gebruikerController');
const gebruikerroutepathprefix="/gebruikers";

module.exports=function(router){

    //middleware
    router.use(function(req,res,next){
        //do type and other validations here
        next();
    });

   router.route(gebruikerroutepathprefix)
        .post(gebruikerController.createGebruiker)
        .get(gebruikerController.getAllGebruikers);
    
    router.route(gebruikerroutepathprefix+ '/email')
    .get(gebruikerController.getGebruikerAtEmail);

        router.route(gebruikerroutepathprefix+ '/pass')
        .get(gebruikerController.checkWachtwoord);

    
    router.route(gebruikerroutepathprefix+'/:gebruiker_id')
        .get(gebruikerController.getGebruikerAtId)
        .put(gebruikerController.updateGebruiker)
        .delete(gebruikerController.deleteGebruiker);

    

}