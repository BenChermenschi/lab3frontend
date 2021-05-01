const express = require('express');
const lesRouter = express.Router();

lesController = require('..controllers/lesController');

//testroute
lesController.get('/',(req,res)=>{
    res.send('LES');
});

module.exports = router;