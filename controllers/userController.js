let mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
let User = mongoose.model('User');

exports.createUser= async function(req,res,next){
    var saltrounds = 10; //defines the level of encryption, the higher the number the more encrypted but also the slower the application.
     //encrypting the password
     bcrypt.hash(req.body.wachtwoord,saltrounds).then(hash=>{
        var user = new User(); 
       
        //setting the fields
        user.naam = req.body.naam; 
        user.email = req.body.email;
        
        user.wachtwoord=hash;

        //save and check for errors
        user.save().then(result=>{
            if(!result){
                return res.status(500).json({
                    message:"error creating user"
                })
            }
            res.json({message:'user created'});
        });
        
    });
}