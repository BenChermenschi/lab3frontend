const jwt= require('jsonwebtoken');
require('dotenv').config();

exports.login=function(req,res){
    let email = req.body.email;
    let wachtwoord = req.body.wachtwoord;

    let payload={email:email}

    let accessToken= jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{
        algorithm:"HS256",
        expiresIn: process.env.ACCESS_TOKEN_LIFE
    });

    let refreshToken= jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{
        algorithm:"HS256",
        expiresIn: process.env.REFRESH_TOKEN_LIFE
    });
    //TODO Rewrite this to store the token somewhere better!!! like a COOKIE
    //storing the refresh token in userarray
    users[email].refreshToken =refreshToken;

    //send token to client as a delicious cookie
    res.cookie("jwt",accessToken,{secure:true,httpOnly:true});
    res.send();
}

exports.refresh=function(req,res){
    let accessToken = req.cookies.jwt;

    if(!accessToken){
        return res.status(403).send();
    }

    let payload;
    //verify access token
    try{
        payload= jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
    }
    catch(err){
        return res.status(401).send();
    }

    let refreshToken = users[payload.email].refreshToken;
    //verify refresh token
    try{
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)
    }
    catch(err){
        return res.status(401).send();
    }

    let newToken = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{
        algorithm: "HS256",
        expiresIn: process.env.ACCESS_TOKEN_LIFE
    });

    res.cookie("jwt",newToken,{secure:true,httpOnly:true});
    res.send();

}







