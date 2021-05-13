const mongoose = require('mongoose');
const Vak = mongoose.model('Vak');

exports.createVak= function(req,res,next){
    let vak = new Vak();
    
    vak.naam = req.body.naam;

    vak.save(function(err){r
        if(err){
            res.send(err);
        }
        res.json({message:'vak created'});
    });
}

exports.getAllVakken= function(req,res,next){
    Vak.find(function(err,vakken){
        if(err){
            res.send(err);
        }
        res.json(vakken);
    });
}

exports.getVakAtId=function(req,res,next){
    Vak.findById(req.params.vak_id,function(err,vak){
        if (err){
            res.send(err);
        }
        res.json(vak);
    });
}

exports.updateVak=function(req,res,next){
    Vak.findById(req.params.vak_id,function(err,vak){
        if(err){
            res.send(err);
        }

        vak.naam= req.body.naam;

        vak.save(function(err){
            if(err){
                res.send(err);
            }
            res.json({message:'Vak updated!'});
        });
    });
}

exports.deleteVak=function(req,res,next){
    Vak.remove({_id:req.params.vak_id},function(err,vak){
        if (err){
            res.send(err);
        }
        res.json({message: 'vak successfully deleted'});
    });
}