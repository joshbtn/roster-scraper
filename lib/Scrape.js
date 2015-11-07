var ROSTER_MODULE_LOCATION = "./scrapers/";
var _ = require('underscore');

function Scrape(name, options){
    var defaultOptions = {autoLoad: true};
    options = _(defaultOptions, options);
    
    var scraper = getRosterModule(name);
    
    return scraper;
}

function getRosterModule(rosterName){
  var modulePath = ROSTER_MODULE_LOCATION + rosterName;
  console.log("Loading roster module " + modulePath);
  return require(modulePath);
}

module.exports = Scrape