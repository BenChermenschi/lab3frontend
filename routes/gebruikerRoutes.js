const express=require('express');
const Gebruiker=require('../models/gebruikerModel');
const gebruikerController = require('../controllers/gebruikerController');
const prefix="/gebruikers";
const authmiddleware = require('../authenticationMiddleware');

module.exports=function(router,authrouter,adminrouter){

    //middleware
    router.use(function(req,res,next){
        //do type and other validations here
        next();
    });
    
   router.route(prefix)
        .get([
            authmiddleware.verifyTokenAdmin,
            gebruikerController.getAllGebruikers
        ]);
    
    
    router.route(prefix+ '/email')
        .get([
            authmiddleware.verifyToken,
            gebruikerController.getGebruikerAtEmail]);

       // router.route(gebruikerroutepathprefix+ '/pass').get(gebruikerController.checkWachtwoord);

    
    router.route(prefix+'/:gebruiker_id')
        .get([
            authmiddleware.verifyToken,
            gebruikerController.getGebruikerAtId]);

    //private

    //admin
    router.route(prefix)
        .post([
            authmiddleware.verifyTokenAdmin,
            gebruikerController.createGebruiker]);
    
    router.route(prefix+'/:gebruiker_id')
        .put([
            authmiddleware.verifyTokenAdmin,
            gebruikerController.updateGebruiker])
        .delete([
            authmiddleware.verifyTokenAdmin,
            gebruikerController.deleteGebruiker]);

}