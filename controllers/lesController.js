var mongoose = require('mongoose');
var les = mongoose.model('Les');

//GET : all lessen
exports.getAllLessen= function(req,res,next){
    
    //grab all lessen
    console.log('searching for all Lessen');
    les.find().exec(function(err,lessen){
        //on fail
        if (err){
            return res.status(500).json({
                title:'Error occured',
                error:err
            });
        }
        //on success
        res.status(200).json({
            message:'success',
            obj: les
        });
    });
}

//GET : les by id
/*exports.getLesAtId= function(req,res){
    console.log('searching lessen for _id : ');
    console.log(req.params.id);
    les.find({_id:req.params.id}).exec(function(err,responseLes){
        //on fail
        if (err){
            return res.status(500).json({
                title:'error occured',
                error:err
            });
        }
        //on success
        res.status(200).json({
            message:'Success',
            object:responseLes
        });
    });
}*/

//GET : Les by date
/*exports.getLesAtDate= function(req,res){
    console.log('searching lessen for datum : ');
    console.log(req.params.datum);
    les.find({datum:req.params.datum}).exec(function(err,responseLes){
        //onfail
        if(err){
            return res.status(500).json({
                title:'Error occurred',
                error:err
            });
        }

        //on success
        res.status(200).json({
            message:'Success',
            object:responseLes
        });
    });
    
}*/
