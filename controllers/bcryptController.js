const bcrypt = require('bcryptjs');

exports.compareAsync =function (passToCheck,hashedPass){
    return new Promise(function(resolve,reject){
        bcrypt.compare(passToCheck,hashedPass,function(err,res){
            if(err){
                reject(err);
            }else{
                resolve(res);
            }
        });
    });
}