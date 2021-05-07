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

exports.getUserAtId=function(req,res,next){
    User.findById(req.params.user_id,function(err,user){
        if(err){
            res.send(err);
        }
        res.json(user);
    });
}

exports.updateUser=function(req,res,next){          // need to check if what to do with the password an encryption
                                                    // also very unsafe
    User.findById(req.params.user_id,function(err,user){
        if(err){ 
            res.send(err);
        }
       
       
  
        
            user.naam = req.body.naam; 
            user.email = req.body.email;
            user.usertype = req.body.usertype._id;

            user.save().then(result=>{
                if(!result){
                    return res.status(500).json({
                        message:"error creating user"
                    })
                }
                res.json({message:'user updated'});
            });
        });
    
}
