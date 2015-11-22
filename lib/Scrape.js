'use strict';

var ROSTER_LOCATION = "./scraper/",
    _ = require('underscore'),
    http = require('http'),
    BaseScraper = require("./scraper/BaseScraper"),
    util = require('util');


function getScraperConfig(rosterName){
  var rosterPath = ROSTER_LOCATION + rosterName;
  console.log("Loading roster module " + rosterPath);
  return require(rosterPath);
}

function Scrape(config, options){
    var defaultOptions = {autoLoad: true};
    options = _.extend(defaultOptions, options);
    
    var scraperConfig;

    if(typeof config === 'string') {
      scraperConfig = getScraperConfig(config);
    } else if (typeof config === 'object') {
      scraperConfig = config;
    } else {
      throw new Error("config must be a string or an object");
    }
    
    var scraper =  new BaseScraper(scraperConfig);
    
    if(options.autoLoad){
      scraper.loadDocuments();
    }
    
    return scraper;
}

Scrape.loadRosters = function(){
    
    var teams = this.team,
        team = null,
        teamIndex,
        loaded = false;
    
    for(teamIndex = 0 ; teamIndex < teams.length; teamIndex += 1){
        
        team = teams[teamIndex];
        data = scrape(team.roster.document);
        loaded = false;
        
        console.log("Loading roster for " + team.name + " at " + team.roster.uri);
        
        var htmlDoc = get(team.roster.uri);
        
        team.roster.document = htmlDoc;
    }
}

Scrape.prototype.buildScraper = buildScraper;

module.exports = Scrape;