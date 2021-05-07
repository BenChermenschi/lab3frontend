const mongoose = require('mongoose');
const Les = mongoose.model('Les');

exports.createLes= function(req,res,next){
    let les = new Les();
    
    les.naam = req.body.naam;

    les.save(function(err){r
        if(err){
            res.send(err);
        }
        res.json({message:'les created'});
    });
}

exports.getAllLessen= function(req,res,next){
    Les.find(function(err,lessen){
        if(err){
            res.send(err);
        }
        res.json(lessen);
    });
}

exports.getLesAtId=function(req,res,next){
    Les.findById(req.params.les_id,function(err,les){
        if (err){
            res.send(err);
        }
        res.json(les);
    });
}

exports.updateLes=function(req,res,next){
    Les.findById(req.params.les_id,function(err,les){
        if(err){
            res.send(err);
        }

        les.naam= req.body.naam;

        les.save(function(err){
            if(err){
                res.send(err);
            }
            res.json({message:'Les updated!'});
        });
    });
}

exports.deleteLes=function(req,res,next){
    Les.remove({_id:req.params.les_id},function(err,les){
        if (err){
            res.send(err);
        }
        res.json({message: 'Les successfully deleted'});
    });
}