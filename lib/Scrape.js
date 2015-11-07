var ROSTER_MODULE_LOCATION = "rosters/";
var _ = require('underscore');

function Scrape(name, options){
    var defaultOptions = {autoLoad: true};
    options = _(defaultOptions, options);
    
    var scraper = getRosterModule(name);
    
    return scraper;
}

function getRosterModule(rosterName){
  var modulePath = ROSTER_MODULE_LOCATION + rosterName + ".js";
  console.log("Loading roster module " + modulePath);
  return require(modulePath);
}

module.exports = Scrape