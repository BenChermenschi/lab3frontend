const mongoose = require('mongoose');
const Vragenlijst = mongoose.model('Vragenlijst');

exports.createVragenlijst= function(req,res,next){
    let vragenlijst = new Vragenlijst();

    vragenlijst.gebruiker = req.body.gebruiker;
    vragenlijst.vak = req.body.vak;
    vragenlijst.datum = new Date();

    
    vragenlijst.klasgroepen = req.body.klasgroepen;
    vragenlijst.reacties = null;

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
        .populate({
            path:'klasgroepen',
            populate:{
                path:'klasgroepen',
                model:'Klasgroep'}
        }) // BLIJKBAAR TOCH NOG NIET FATSOENLIJK RESOLVED ?!
        // Somehow doesnt wanna populate if reacties is empty?
        .exec(function(err,vragenlijsten){ 
        if(err){
            res.send(err);
        }
        
        console.log(vragenlijsten);
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
       
        vragenlijst.klasgroepen = req.body.klasgroepen;
        vragenlijst.reacties = req.body.reacties;

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