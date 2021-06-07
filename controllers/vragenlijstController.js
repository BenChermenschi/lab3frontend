const mongoose = require('mongoose');
const Vragenlijst = mongoose.model('Vragenlijst');
const reactieModel = require('../models/reactieModel');
const Reactie = mongoose.model('Reactie');
const reactieController = require('../controllers/reactieController');
const vragenlijstoutputModel = require('../models/vragenlijstOutputModel');
const VragenlijstOutput = mongoose.model('VragenlijstOutput')

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
                console.log('-----------Starting conversion----');


                
                //setting reacties into vragenlijst
                vragenlijst.reacties = reacties;
                //recast to output
                let output = hercastVragenlijstNaarOutput(vragenlijst);

                //cleanup results for calculations
                const hercast5Punten = hercastArrayBenMee(reacties);
                const hercastUitleggen=hercastArrayOpnieuwUitleggen(reacties);
                
                //5punten schaal
                output.totalen.benMee.aantal1 = filterEnCountArray(hercast5Punten,1);
                output.totalen.benMee.aantal2 = filterEnCountArray(hercast5Punten,2);
                output.totalen.benMee.aantal3 = filterEnCountArray(hercast5Punten,3);
                output.totalen.benMee.aantal4 = filterEnCountArray(hercast5Punten,4);
                output.totalen.benMee.aantal5 = filterEnCountArray(hercast5Punten,5);

                console.log('output 1 : ' + output.totalen.benMee.aantal1);
                console.log('output 2 : ' + output.totalen.benMee.aantal2);
                console.log('output 3 : ' + output.totalen.benMee.aantal3);
                console.log('output 4 : ' + output.totalen.benMee.aantal4);
                console.log('output 5 : ' + output.totalen.benMee.aantal5);

               

                //ja/nee
                output.totalen.opnieuwUitleggen.aantalJa = filterEnCountArray(hercastUitleggen,true);
                output.totalen.opnieuwUitleggen.aantalNee = filterEnCountArray(hercastUitleggen,false);

                console.log('output Ja : ' + output.totalen.opnieuwUitleggen.aantalJa);
                console.log('output Nee : ' + output.totalen.opnieuwUitleggen.aantalNee);

                

                

                

                

                

                console.log('=-=-=-=-=OUTPUT=-=-=-=-=');
                console.log(output);
                res.json(output);
                

            });
       
        





        
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
        
        
        .exec(function(err,vragenlijsten){
            if(err){
                res.send(err);
            }
            res.json(vragenlijsten);
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





function hercastArrayBenMee(reactielijst){
    let resultaat = [];
    console.log('recasting : ');
    for(let i = 0; i<reactielijst.length;i++){
        resultaat[i]=reactielijst[i].benMee;
        console.log(i+' - '+resultaat[i]);
    }
    return resultaat;
}

function hercastArrayOpnieuwUitleggen(reactielijst){
    let resultaat = [];
    console.log('recasting : ');
    for(let i = 0; i<reactielijst.length;i++){
        resultaat[i]=reactielijst[i].opnieuwUitleggen;
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


function hercastVragenlijstNaarOutput(vragenlijst){
    let output = new VragenlijstOutput();
    output._id= vragenlijst._id;
    output.__v = vragenlijst.__v;
    output.gebruiker=vragenlijst.gebruiker;
    output.datum=vragenlijst.datum;
    output.vak=vragenlijst.vak;
    output.klasgroepen=vragenlijst.klasgroepen;
    output.reacties=vragenlijst.reacties;
    return output;
}