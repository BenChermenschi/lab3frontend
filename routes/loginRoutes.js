const express = require('express');
const gebruiker = require('../controllers/gebruikerController');
const authMiddleware = require('../authenticationMiddleware');
const { login } = require('../controllers/loginController');
const prefix = "/auth"
module.exports= function(router){
    
    router.route(prefix +'/verify').post(authMiddleware.verifyToken);
    router.route(prefix + '/login').post(login);
}