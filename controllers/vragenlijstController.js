const mongoose = require('mongoose');
const Vragenlijst = mongoose.model('Vragenlijst');

exports.createVragenlijst= function(req,res,next){
    let vragenlijst = new Vragenlijst();

    vragenlijst.gebruiker = req.body.gebruiker;
    vragenlijst.vak = req.body.vak;
    vragenlijst.datum = new Date();

    
    vragenlijst.klasgroepen = req.body.klasgroepen;
    vragenlijst.reacties = req.body.reacties;

    vragenlijst.save(function(err){
        if(err){
            res.send(err);
        }
        res.json({message:'vragenlijst created'});
    });
}

exports.getAllVragenlijsten= function(req,res,next){

    try{
        Vragenlijst.find()
    
        .populate({
            path:'gebruiker',
            options: { retainNullValues: true },
            model: 'Gebruiker',
            populate:{
                path:'gebruikerstype',
                model:'GebruikersType',
                options: { retainNullValues: true },
            }
        })
        .populate('vak')
        .populate({
            path:'klasgroepen',
            options: { retainNullValues: true },
            populate:{
                path:'klasgroepen',
                model:'Klasgroep',
                options: { retainNullValues: true }
            }
        }) // BLIJKBAAR TOCH NOG NIET FATSOENLIJK RESOLVED ?!
        // Somehow doesnt wanna populate if reacties is empty?
        .exec(function(err,vragenlijsten){ 
        if(err){
            res.send(err);
        }
        
        console.log(vragenlijsten);
        res.json(vragenlijsten);
    });
    }catch(err){
        console.log(err);
    }
    
}

exports.getVragenlijstAtId= function(req,res,next){
    try{
        console.log("to find id : ");
        console.log(req.params.vragenlijst_id);
        console.log('searching');
        Vragenlijst.findById(req.params.vragenlijst_id)
    .populate({
        path:'gebruiker',
        options: { retainNullValues: true },
        model: 'Gebruiker',
        populate:{
            path:'gebruikerstype',
            model:'GebruikersType',
            options: { retainNullValues: true },
        }
    })
    .populate('vak')
    .populate({
        path:'klasgroepen',
        options: { retainNullValues: true },
        populate:{
            path:'klasgroepen',
            model:'Klasgroep',
            options: { retainNullValues: true }
        }
    })
    
    .exec(function(err,vragenlijst){
        if (err){
            res.send(err);
        }
        res.json(vragenlijst);
    });

    }catch(err){
        console.log(err);
    }
    
}

exports.getVragenlijstenByGebruikersId=function(req,res,next){
    Vragenlijst.find({gebruiker:req.body.gebruikers_id})
    .populate({
        path:'gebruiker',
        options: { retainNullValues: true },
        model: 'Gebruiker',
        populate:{
            path:'gebruikerstype',
            model:'GebruikersType',
            options: { retainNullValues: true },
        }
    })
    .populate('vak')
    .populate({
        path:'klasgroepen',
        options: { retainNullValues: true },
        populate:{
            path:'klasgroepen',
            model:'Klasgroep',
            options: { retainNullValues: true }
        }
    })
    
    
    .exec(function(err,vragnelijsten){
        if(err){
            res.send(err);
        }
        res.json(vragnelijsten);
    })
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