var ROSTER_MODULE_LOCATION = "./scraper/";
var _ = require('underscore');

function Scrape(name, options){
    var defaultOptions = {autoLoad: true};
    options = _(defaultOptions, options);
    
    var scraperConfig = getScraperConfig(name);
    
    return buildScraper(scraperConfig);
}

function getScraperConfig(rosterName){
  var modulePath = ROSTER_MODULE_LOCATION + rosterName;
  console.log("Loading roster module " + modulePath);
  return require(modulePath);
}

function buildScraper(scraperConfig){
  return scraperConfig;
}

module.exports = Scrape