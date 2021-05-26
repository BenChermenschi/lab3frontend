const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { json } = require('body-parser');
const Gebruiker = mongoose.model('Gebruiker');
const Gebruikerstype = mongoose.model('GebruikersType');
const gebruikerstypeController = require('../controllers/gebruikerstypeController');
const tokenController = require('./loginController');

exports.createGebruiker= async function(req,res,next){
    const saltrounds = 10; //defines the level of encryption, the higher the number the more encrypted but also the slower the application.
     bcrypt.hash(req.body.wachtwoord,saltrounds).then(hash=>{
        let gebruiker = new Gebruiker(); 
        
        gebruiker.voornaam =  req.body.voornaam;
        gebruiker.naam = req.body.naam; 
        gebruiker.email = req.body.email;
        gebruiker.gebruikerstype = req.body.gebruikerstype;
        gebruiker.wachtwoord=hash;

        gebruiker.save().then(result=>{
            if(!result){
                return res.status(500).json({
                    message:"error creating gebruiker"
                })
            }
            res.json({message:'gebruiker created'});
        });
        
    });
}

exports.getAllGebruikers=function(req,res,next){ //Extremely unsafe!
    Gebruiker.find().populate('gebruikerstype').exec(function(err,gebruikers){
        if(err){
            res.send(err);
        }
        
        res.json(gebruikers);
    });
}

exports.getGebruikerAtId=function(req,res,next){
    Gebruiker.findById(req.params.gebruiker_id).populate('gebruikerstype').exec(function(err,gebruiker){
        if(err){
            res.send(err);
        }
        res.json(gebruiker);
    });
}

exports.getGebruikerAtEmail=function(req,res,next){
    Gebruiker.find({email:req.body.email}).populate('gebruikerstype').exec(function(err,gebruiker){
        if(err){
            res.send(err);
        }
        res.json(gebruiker);
    });
}



exports.updateGebruiker=function(req,res,next){          // need to check if what to do with the password an encryption
                                                    // also very unsafe
    Gebruiker.findById(req.params.gebruiker_id).exec(function(err,gebruiker){
        if(err){ 
            res.send(err);
        }
            gebruiker.voornaam =  req.body.voornaam;
            gebruiker.naam = req.body.naam;
            gebruiker.email = req.body.email;
            gebruiker.gebruikerstype = req.body.gebruikerstype;

            gebruiker.save().then(result=>{
                if(!result){
                    return res.status(500).json({
                        message:"error creating gebruiker"
                    })
                }
                res.json({message:'gebruiker updated'});
            });
        });
    
}

exports.deleteGebruiker=function(req,res,next){ //unsafe
    Gebruiker.remove({_id:req.params.gebruiker_id},function(err,gebruiker){
        if(err){
            res.send(err);
        }
        res.json({message:'user sucessfully deleted'});
    });
}


exports.checkWachtwoord=function(bodyemail,wachtwoord){
   /* 
    let wachtwoord = req.body.wachtwoord;
    let bodyemail = req.body.email;
 */

    Gebruiker.findOne({email:bodyemail}).select('+wachtwoord').populate('gebruikerstype').exec(function(err,gebruiker){
   
        if(err){
            res.send(err);
        }
        console.log("entered password : '" +wachtwoord+"'");
        bcrypt.compare(wachtwoord,gebruiker.wachtwoord,(err,isValid) =>{

            console.log('isValid = ' +isValid);
            return isValid;
            if(err){
                res.send(err);
            } 
        });
    });
}

exports.checkEmail=function(emailToCheck){
    
    Gebruiker.findOne({email:emailToCheck}).select('+wachtwoord').populate('gebruikerstype').exec(function(err,gebruiker){
        if(err){
            console.log(err);
            res.send(err);
        }
        console.log("found something");
        console.log(gebruiker);
        return gebruiker;
    });
}
 
exports.checkWachtwoordAndEmail= function(emailToCheck,wachtwoordToCheck){
   Gebruiker.findOne({ email: emailToCheck }).select('+wachtwoord').populate('gebruikerstype').exec(function (err, gebruiker) {

        if (err) {
            res.send(err);
        }
        console.log("entered password : '" + wachtwoordToCheck + "'");
        bcrypt.compare(wachtwoordToCheck, gebruiker.wachtwoord, (err, isValid) => {

            console.log('isValid = ' + isValid);

            if (err) {
                res.send(err);
            }

            console.log(gebruiker);
            
        });
    });
}

