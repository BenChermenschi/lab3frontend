const mongoose = require('mongoose');
const Gebruikerstype = require('../models/gebruikerstypeModel');


//Create
exports.createGebruikerstype=function(req,res,next){
    let gebruikerstype = new Gebruikerstype(); 
    gebruikerstype.naam = req.body.naam; 

    gebruikerstype.save(function(err){
        if(err){
            res.send(err);
        }
        res.json({message:'gebruikerstype created'});
    });
}

//Read
exports.getAllGebruikerstypes=function(req,res,next){
    Gebruikerstype.find(function(err,gebruikerstypes){
        if(err){
            res.send(err);
        }
        res.json(gebruikerstypes);
    });
}
exports.getGebruikerstypeAtId=function(req,res,next){
    Gebruikerstype.findById(req.params.gebruikerstype_id,function(err,gebruikerstype){
        if (err){
            res.send(err);
        }
        res.json(gebruikerstype);
    });
}

//Update
exports.updateGebruikerstype=function(req,res,next){
    Gebruikerstype.findById(req.params.gebruikerstype_id,function(err,gebruikerstype){
        if(err){
            res.send(err);
        }
        gebruikerstype.naam= req.body.naam;
        gebruikerstype.save(function(err){
            if(err){
                res.send(err);
            }
            res.json({message:'Gebruikerstype updated!'});
        });
    });
}

//Delete
exports.deleteGebruikerstype=function(req,res,next){
    Gebruikerstype.remove({_id:req.params.gebruikerstype_id},function(err,gebruikerstype){
        if (err){
            res.send(err);
        }
        res.json({message: 'Gebruikerstype successfully deleted'});
    });
}