const mongoose = require('mongoose');
const Vragenlijst = mongoose.model('Vragenlijst');

exports.createVragenlijst= function(req,res,next){
    let vragenlijst = new Vragenlijst();

    vragenlijst.gebruiker = req.body.gebruiker._id;
    vragenlijst.vak = req.body.vak._id;
    vragenlijst.datum = new Date();

    let klasgroepen_idList = [];
    req.body.klasgroepen.forEach((element,i) => {
        klasgroepen_idList[i] =element._id;
    });
    vragenlijst.klasgroepen = klasgroepen_idList;
    vragenlijst.responses = req.body.responses;

    vragenlijst.save(function(err){
        if(err){
            res.send(err);
        }
        res.json({message:'vragenlijst created'});
    });
}

exports.getAllVragenlijsten= function(req,res,next){
    Vragenlijst.find()
    
        .populate({
            path:'gebruiker',
            model: 'Gebruiker',
            populate:{
                path:'gebruikerstype',
                model:'GebruikersType'
            }
        })
        .populate('vak')
        .populate('klasgroepen').populate('responses').exec(function(err,vragenlijsten){ //HIER BEZIG (in populate)
        if(err){
            res.send(err);
        }
        res.json(vragenlijsten);
    });
}

exports.getVragenlijstAtId=function(req,res,next){
    Vragenlijst.findById(req.params.vragenlijst_id,function(err,vragenlijst){
        if (err){
            res.send(err);
        }
        res.json(vragenlijst);
    });
}

exports.updateVragenlijst=function(req,res,next){
    Vragenlijst.findById(req.params.vragenlijst_id,function(err,vragenlijst){
        if(err){
            res.send(err);
        }

        vragenlijst.gebruiker = req.body.gebruiker;
        vragenlijst.vak = req.body.vak;
        //vragenlijst.datum = new Date();
        vragenlijst.klasgroepen = req.body.klasgroepen;
        vragenlijst.responses = req.body.responses;

        vragenlijst.save(function(err){
            if(err){
                res.send(err);
            }
            res.json({message:'Vragenlijst updated!'});
        });
    });
}

exports.deleteVragenlijst=function(req,res,next){
    Vragenlijst.remove({_id:req.params.vragenlijst_id},function(err,vragenlijst){
        if (err){
            res.send(err);
        }
        res.json({message: 'vragenlijst successfully deleted'});
    });
}