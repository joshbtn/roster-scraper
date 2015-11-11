var jsdom = require("jsdom");
var fs = require("fs");
var jquery = fs.readFileSync(__dirname + "/../../node_modules/jquery/dist/jquery.js", "utf-8");

function scrape(html){

    var document = jsdom.jsdom(html);
    var window = document.defaultView;
    
    //Inject jQuery
    var scriptEl = window.document.createElement("script");
    scriptEl.innerHTML = jquery;
    window.document.body.appendChild(scriptEl);

    console.log(window.$);
    
}

function BaseScraper(){
    var self = this,
        data = [];

    this.setData = function(){
        return data;
    }

    this.getData = function(){
        return data;
    }
    
    this.scrape = function(){
        var teams = this.team,
            team = null,
            teamIndex;
        
        for(teamIndex = 0 ; teamIndex < teams.length; teamIndex += 1){
            team = teams[teamIndex];
            scrape(team.roster.document);
        }
    }
}

module.exports = BaseScraper;