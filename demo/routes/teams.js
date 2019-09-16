var express = require('express');
var router = express.Router();
var fs=require('fs')

router.get('/',(request, response) => {
    response.render('teams', {pageTitle: 'Teams'});
});

router.get('/data', (request, response) => {
    try{
        response.end(fs.readFileSync('./data/teams.json'));
    }
    catch(err){
        // if there is nothing send an empty array 
        response.end('[]');
    }
});

/*var teamIdLoc=location.href.lastIndexOf("/")+1;
var teamId=location.href.substring(teamIdLoc,location.href.length) */

// GET MANY TEAMS BY LEAGUE
router.get("/teams/data/:id", function (req, res) {
    let id = req.params.id;
    console.log("Received a GET request for teams in league " + id);                      

    let data = fs.readFileSync( __dirname + "/data/teams.json", "utf8");
    data = JSON.parse(data);

    // find the matching teams for 
    let matches = getMatchingTeamsByLeague(id, data);

    //console.log("Returned data is: ");
    //logArrayOfTeams(matches);
    res.end( JSON.stringify(matches) );
})

function getMatchingTeamsByLeague(leagueCode, data)
{
    let matches = data.filter( t => t.League == leagueCode );
    return matches;
}
module.exports=router;

