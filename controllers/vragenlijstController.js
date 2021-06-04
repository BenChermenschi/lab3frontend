const mongoose = require('mongoose');
const Vragenlijst = mongoose.model('Vragenlijst');
const reactieModel = require('../models/reactieModel');
const Reactie = mongoose.model('Reactie');
const reactieController = require('../controllers/reactieController');

exports.createVragenlijst= function(req,res,next){
    let vragenlijst = new Vragenlijst();

    vragenlijst.gebruiker = req.gebruiker.id;
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
        console.log('ben mee totaal test');
        vragenlijst.benMeeTotaal = 20;
        console.log(vragenlijst.benMeeTotaal);
        console.log('benmee1berekening test');
        console.log(genereerBenMee1totaal(vragenlijst._id));





        res.json(vragenlijst);
    });

    }catch(err){
        console.log(err);
    }
    
}

exports.getVragenlijstenByGebruikersId=function(req,res,next){
    try{
        Vragenlijst.find({gebruiker:req.gebruiker.id})
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
    }catch(err){
        console.log(err);
    }
   
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

exports.verwerkReactiesSolo= function(vragenlijst_id){
    const reactielijst = reactieController.getReactieByVragenlijstInternal(vragenlijst_id);
    berekenVraag1(reactielijst);
}

async function haalReactielijst(vragenlijst_id){
    const resultaat = await reactieController.getReactieByVragenlijstInternal(vragenlijst_id);
    return resultaat;
}


function genereerBenMee1totaal(vragenlijst_id){
   const reactielijst =  haalReactielijst(vragenlijst_id);
   const hercast = hercastArrayBenMee(reactielijst);
   const resultaat =  berekenVraag1(hercast,1);
   return resultaat;
}
function hercastArrayBenMee(reactielijst){

    console.log(reactielijst);
    let resultaat = [];
  
    for(let i = 0; i<reactielijst.length;i++){
        resultaat[i]=reactielijst.benMee;
    }


    return resultaat;
}

function filterEnCountArray(array,query){
    let count = 0;
    for(let i = 0;i<array.length;i++){
        if(array[i]==query){
            count++;
        }
    }

    return count;
}


function berekenAantalAntwoorden(reactielijst){

}