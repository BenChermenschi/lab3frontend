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

exports.getVragenlijstAtId= async function(req,res,next){
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
    
    .exec( async function(err,vragenlijst){
        if (err){
            res.send(err);
        }
        console.log('ben mee totaal test');
        vragenlijst.benMeeTotaal = 20;
        console.log(vragenlijst.benMeeTotaal);
        console.log('benmee1berekening test');
        //reactieController.GenereerTotalenReactiesVoorVragenlijst(vragenlijst._id,req,res,next);
        
        
        Reactie.find({vragenlijst:vragenlijst._id}).exec( function(err,reacties){
             
                if (err){
                    console.log(err);
                }
                
                console.log(reacties);
                console.log(vragenlijst);
                
                let aantalStudentenNietMee = genereerBenMee1totaal(reacties);
                vragenlijst.benMeeTotaal1 = aantalStudentenNietMee;

                console.log('vragenlijst.benMeeTotaal1 : ');
                console.log(vragenlijst.benMeeTotaal1);


            });
       
        





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




function genereerBenMee1totaal(reactielijst){
   console.log("recasting array");
   console.log("to recast : ");
   console.log(reactielijst);
   const hercast = hercastArrayBenMee(reactielijst);
   console.log("counting results");
   const resultaat =  filterEnCountArray(hercast,1);
   return resultaat;
}
function hercastArrayBenMee(reactielijst){

    console.log(reactielijst);
    let resultaat = [];
    console.log('recasting : ');
    for(let i = 0; i<reactielijst.length;i++){
        resultaat[i]=reactielijst[i].benMee;
        console.log(i+' - '+resultaat[i]);
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