const jwt= require('jsonwebtoken');
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { json } = require('body-parser');
const Gebruiker = mongoose.model('Gebruiker');
const Gebruikerstype = mongoose.model('GebruikersType');
const gebruikerstypeController = require('../controllers/gebruikerstypeController');
const gebruikersController = require('./gebruikerController');
const { genToken } = require('./tokenController');


exports.login =  function(req,res){
    let email = req.body.email;
    let wachtwoord = req.body.wachtwoord;
    let isAdmin = false;
    console.log("attempting login");
    try{
       // let resultaat1 =  gebruikersController.checkEmail(email);


        //let resultaat2= gebruikersController.checkWachtwoord(email,wachtwoord);
         let resultaat1 =  gebruikersController.checkWachtwoordAndEmail(email,wachtwoord);
            console.log("resultaat1 : ");       
            console.log(res2);
            console.log("behind resultaat 1");
            if (res2.gebruikerstype.naam == 'Administrator'){
                isAdmin = true;
                console.log('granting admin priviledge');
            }

            genToken(res,resultaat1.vollenaam,resultaat1._id,isAdmin);
         
         
        //// CHECK OUT PROMISES YOU DUM DUM!!! BCRYPT IS MAKING THIS STUFF ASYNC!!!!!!
        

    


    }catch(err){
        console.log("something has gone wrong, I blame this : ");
        console.log(err);
        res.json(err);
    }
}













