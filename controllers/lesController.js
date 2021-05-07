var mongoose = require('mongoose');
var Les = mongoose.model('Les');
//=========================
//CRUD
//=========================

////C : Create
//////POST : http://localhost:3000/api/lessen
////// create new les
exports.createLes= function(req,res,next){
    var les = new Les(); //create new instance of Les model
    
    //setting values
    les.naam = req.body.naam; //set lesname

    //save and check for errors
    les.save(function(err){
        //on error
        if(err){
            res.send(err);
        }
        //on success
        res.json({message:'les created'});
    });
}

////R : Read
//////GET : http://localhost:3000/api/lessen
////// get list of all lessen
exports.getAllLessen= function(req,res,next){
    //search all lessen
    Les.find(function(err,lessen){
        //on error
        if(err){
            res.send(err);
        }
        //on success
        res.json(lessen);
    });
}
//////GET : http://localhost:3000/api/lessen/_id
////// get specific les by its _id
exports.getLesAtId=function(req,res,next){
    //search by id
    Les.findById(req.params.les_id,function(err,les){
        //on error
        if (err){
            res.send(err);
        }
        //on success
        res.json(les);
    });
}

////U : Update
//////PUT : http://localhost:3000/api/lessen/_id
////// update the les at _id
exports.updateLes=function(req,res,next){
    //searching the database for a les with the _id
    Les.findById(req.params.les_id,function(err,les){
        //if not found
        if(err){
            res.send(err);
        }
        //if a existing les is found at that _id
        //overwriting the old data
        les.naam= req.body.naam;

        //saving the overwrite
        les.save(function(err){
            //on error
            if(err){
                res.send(err);
            }
            //on success
            res.json({message:'Les updated!'});
        });
    });
}

////D : Delete
//////DELETE : http://localhost:3000/api/lessen/_id
////// remove the les at _id
exports.deleteLes=function(req,res,next){
    //removing it at the given les_id
    Les.remove({_id:req.params.les_id},function(err,les){
        //on error
        if (err){
            res.send(err);
        }
        res.json({message: 'Les successfully deleted'});
    });
}