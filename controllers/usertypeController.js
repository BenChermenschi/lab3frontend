var mongoose = require('mongoose');
const Usertype = require('../models/usertypeModel');


//Create
exports.createUsertype=function(req,res,next){
    var usertype = new Usertype(); 
    usertype.naam = req.body.naam; 

    usertype.save(function(err){
        if(err){
            res.send(err);
        }
        res.json({message:'usertype created'});
    });
}

//Read
exports.getAllUsertypes=function(req,res,next){
    Usertype.find(function(err,usertypes){
        if(err){
            res.send(err);
        }
        res.json(usertypes);
    });
}
exports.getUsertypeAtId=function(req,res,next){
    Usertype.findById(req.params.usertype_id,function(err,usertype){
        if (err){
            res.send(err);
        }
        res.json(usertype);
    });
}

//Update
exports.updateUsertype=function(req,res,next){
    Usertype.findById(req.params.usertype_id,function(err,usertype){
        if(err){
            res.send(err);
        }
        usertype.naam= req.body.naam;
        usertype.save(function(err){
            if(err){
                res.send(err);
            }
            res.json({message:'Usertype updated!'});
        });
    });
}

//Delete
exports.deleteUsertype=function(req,res,next){
    Usertype.remove({_id:req.params.usertype_id},function(err,usertype){
        if (err){
            res.send(err);
        }
        res.json({message: 'Usertype successfully deleted'});
    });
}