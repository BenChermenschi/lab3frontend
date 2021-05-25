const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { json } = require('body-parser');
const Gebruiker = mongoose.model('Gebruiker');
const Gebruikerstype = mongoose.model('GebruikersType');
const gebruikerstypeController = require('../controllers/gebruikerstypeController');

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
    Gebruiker.findById(req.params.gebruiker_id,function(err,gebruiker){
        if(err){
            res.send(err);
        }
        res.json(gebruiker);
    });
}

exports.getGebruikerAtEmail=function(req,res,next){
    Gebruiker.find({email:req.body.email}).exec(function(err,gebruiker){
        if(err){
            res.send(err);
        }
        res.json(gebruiker);
    });
}



exports.updateGebruiker=function(req,res,next){          // need to check if what to do with the password an encryption
                                                    // also very unsafe
    Gebruiker.findById(req.params.gebruiker_id,function(err,gebruiker){
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


exports.checkWachtwoord=function(req,res,next){
    
    let wachtwoord = req.body.wachtwoord;



    
}