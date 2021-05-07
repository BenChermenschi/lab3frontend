const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { json } = require('body-parser');
const User = mongoose.model('User');
const Usertype = mongoose.model('UserType');

exports.createUser= async function(req,res,next){
    const saltrounds = 10; //defines the level of encryption, the higher the number the more encrypted but also the slower the application.
     bcrypt.hash(req.body.wachtwoord,saltrounds).then(hash=>{
        let user = new User(); 
        
        user.naam = req.body.naam; 
        user.email = req.body.email;
        console.log(req.body.usertype._id);
        user.usertype = req.body.usertype._id;
        user.wachtwoord=hash;

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

exports.getAllUsers=function(req,res,next){ //Extremely unsafe!
    User.find(function(err,users){
        if(err){
            res.send(err);
        }
        res.json(users);
    });
}

