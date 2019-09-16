var express = require('express');
var router = express.Router();
var fs=require('fs')

router.get('/',(request, response) => {
    response.render('leagues', {pageTitle: 'Leagues'});
});

router.get('/data', (request, response) => {
    try{
        response.end(fs.readFileSync('./data/leagues.json'));
    }
    catch(err){
        // if there is nothing send an empty array 
        response.end('[]');
    }
});


module.exports=router;
