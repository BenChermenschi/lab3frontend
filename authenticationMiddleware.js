const jwt= require('jsonwebtoken');
const dotenv = require ('dotenv');
dotenv.config();

module.exports.verifyToken= async function(req,res,next){
    const token = req.cookies.token || '';

    try{
        if(!token){
            res.status(401).json('Please login');
        }
        const decrypt = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        req.gebruiker = {
            id:decrypt.id,
            vollenaam:decrypt.vollenaam,
            isAdmin:decrypt.isAdmin
        };
        next();
    } catch(err){
        return res.status(500).json(err.toString());
    }
}