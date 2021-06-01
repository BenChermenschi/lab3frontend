const jwt= require('jsonwebtoken');
const dotenv = require ('dotenv');
dotenv.config();

module.exports.verifyToken= async function(req,res,next){
    const token = req.cookies.token || '';
    console.log('middleware: Verify token');
    console.log(token);
    try{
        console.log("verify token inside try");
        if(!token){
            res.status(401).json('Please login');
        }
        const decrypt = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        console.log("is decrypt awaited?");
        req.gebruiker = {
            id:decrypt.id,
            vollenaam:decrypt.vollenaam,
            isAdmin:decrypt.isAdmin
        };
        console.log("req.gebruiker aangemaakt");
        console.log(req.gebruiker.vollenaam);
        
        next();
    } catch(err){
        console.log("something went wrong : ");
        console.log(err);
        return res.status(500).json(err.toString());
    }
}

module.exports.verifyTokenAdmin=async function(req,res,next){

    const token = req.cookies.token || '';
    console.log('middleware: Verify token');
    console.log(token);
    try{
        console.log("verify token inside try");
        if(!token){
            res.status(401).json('Please login');
        }
        const decrypt = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        console.log("is decrypt awaited?");
        req.gebruiker = {
            id:decrypt.id,
            vollenaam:decrypt.vollenaam,
            isAdmin:decrypt.isAdmin
        };
        console.log("req.gebruiker aangemaakt");
        console.log(req.gebruiker.vollenaam);
        if(req.gebruiker.isAdmin==false){
            res.status(403).json('Not an admin');
        }else{
            next();
        }
        
        
    } catch(err){
        console.log("something went wrong : ");
        console.log(err);
        return res.status(500).json(err.toString());
    }
    
}