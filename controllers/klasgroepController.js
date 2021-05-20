const mongoose = require('mongoose');
const Klasgroep = require('../models/klasgroepModel');


exports.createKlasgroep= function(req,res,next){
    let klasgroep = new Klasgroep();
    
    klasgroep.naam = req.body.naam;
    klasgroep.aantalStudenten = req.body.aantalStudenten;

    klasgroep.save(function(err){
        if(err){
            res.send(err);
        }
        res.json({message:'klasgroep created'});
    });
}

exports.getAllKlasgroepen= function(req,res,next){
    Klasgroep.find(function(err,klasgroepen){
        if(err){
            res.send(err);
        }
        res.json(klasgroepen);
    });
}

exports.getKlasgroepAtId=function(req,res,next){
    Klasgroep.findById(req.params.klasgroep_id,function(err,klasgroep){
        if (err){
            res.send(err);
        }
        res.json(klasgroep);
    });
}

exports.updateKlasgroep=function(req,res,next){
    Klasgroep.findById(req.params.klasgroep_id,function(err,klasgroep){
        if(err){
            res.send(err);
        }


        klasgroep.naam= req.body.naam;
        klasgroep.aantalStudenten = req.body.aantalStudenten;



        klasgroep.save(function(err){
            if(err){
                res.send(err);
            }
            res.json({message:'klasgroep updated!'});
        });
    });
}

exports.deleteKlasgroep=function(req,res,next){
    Klasgroep.remove({_id:req.params.klasgroep_id},function(err){
        if (err){
            res.send(err);
        }
        res.json({message: 'klasgroep successfully deleted'});
    });
}