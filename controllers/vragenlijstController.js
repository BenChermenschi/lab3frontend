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

                //cleanup results for calculations
                const hercast5Punten = hercastArrayBenMee(reacties);
                const hercastUitleggen=hercastArrayOpnieuwUitleggen(reacties);
                
                //5punten schaal
                vragenlijst.benMeeTotaal1 = filterEnCountArray(hercast5Punten,1);
                vragenlijst.benMeeTotaal2 = filterEnCountArray(hercast5Punten,2);
                vragenlijst.benMeeTotaal3 = filterEnCountArray(hercast5Punten,3);
                vragenlijst.benMeeTotaal4 = filterEnCountArray(hercast5Punten,4);
                vragenlijst.benMeeTotaal5 = filterEnCountArray(hercast5Punten,5);

                console.log('vragenlijst.benMeeTotaal1 : ' + vragenlijst.benMeeTotaal1);
                console.log('vragenlijst.benMeeTotaal2 : ' + vragenlijst.benMeeTotaal2);
                console.log('vragenlijst.benMeeTotaal3 : ' + vragenlijst.benMeeTotaal3);
                console.log('vragenlijst.benMeeTotaal4 : ' + vragenlijst.benMeeTotaal4);
                console.log('vragenlijst.benMeeTotaal5 : ' + vragenlijst.benMeeTotaal5);

                let benMeeTotalen = {
                    benMee1:vragenlijst.benMeeTotaal1,
                    benMee2:vragenlijst.benMeeTotaal2,
                    benMee3:vragenlijst.benMeeTotaal3,
                    benMee4:vragenlijst.benMeeTotaal4,
                    benMee5:vragenlijst.benMeeTotaal5
                }
                

                console.log(benMeeTotalen);

                //ja/nee
                vragenlijst.TotaalOpnieuwTrue = filterEnCountArray(hercastUitleggen,true);
                vragenlijst.TotaalOpnieuwFalse = filterEnCountArray(hercastUitleggen,false);

                console.log('vragenlijst.TotaalOpnieuwTrue : ' + vragenlijst.TotaalOpnieuwTrue);
                console.log('vragenlijst.TotaalOpnieuwFalse : ' + vragenlijst.TotaalOpnieuwFalse);

                let opnieuwUitleggenTotalen = {
                    opnieuwUitleggenJa:vragenlijst.TotaalOpnieuwTrue,
                    opnieuwUItleggenNee:vragnelijst.TotaalOpnieuwFalse
                }

                console.log(opnieuwUitleggenTotalen);

                let totalen={
                    benMee:benMeeTotalen,
                    opnieuwUitleggen:opnieuwUitleggenTotalen
                }

                console.log(totalen);

                //setting reacties into vragenlijst
                vragenlijst.reacties = reacties;

                

                console.log('dumping vragenlijst');
                console.log(vragenlijst);

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


function berekenAantalAntwoorden(reactielijst){

}