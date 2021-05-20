const mongoose = require('mongoose');
const Reactie = require('../models/reactieModel');

exports.createReactie= function(req,res,next){
    let reactie = new Reactie();
    
    reactie.benMee = req.body.benMee;
    reactie.opnieuwUitleggen = req.body.opnieuwUitleggen;
    reactie.welkOnderdeel= req.body.welkOnderdeel;
    reactie.andereVragen= req.body.andereVragen;
    reactie.vragenlijst=req.body.vragenlijst;

    reactie.save(function(err){
        if(err){
            res.send(err);
        }
        res.json({message:'reactie created'});
    });
}

exports.getAllReacties= function(req,res,next){
    Reactie.find(function(err,reacties){
        if(err){
            res.send(err);
        }
        res.json(reacties);
    });
}

exports.getReactieAtId=function(req,res,next){
    Reactie.findById(req.params.reactie_id,function(err,reactie){
        if (err){
            res.send(err);
        }
        res.json(reactie);
    });
}

exports.updateReactie=function(req,res,next){                 // this one should be impossible to call !!!!
    Reactie.findById(req.params.reactie_id,function(err,reactie){
        if(err){
            res.send(err);
        }


        reactie.benMee = req.body.benMee;
        reactie.opnieuwUitleggen = req.body.opnieuwUitleggen;
        reactie.welkOnderdeel= req.body.welkOnderdeel;
        reactie.andereVragen= req.body.andereVragen;
        reactie.vragenlijst=req.body.vragenlijst;



        reactie.save(function(err){
            if(err){
                res.send(err);
            }
            res.json({message:'reactie updated!'});
        });
    });
}

exports.deleteReactie=function(req,res,next){             // this one should perhaps also be impossible to call ? Maybe admin only?
    Reactie.remove({_id:req.params.reactie_id},function(err){
        if (err){
            res.send(err);
        }
        res.json({message: 'reactie successfully deleted'});
    });
}