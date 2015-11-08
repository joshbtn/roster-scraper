var ROSTER_MODULE_LOCATION = "./scraper/",
    _ = require('underscore'),
    BaseScraper = require("./scraper/BaseScraper");

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
    
    return buildScraper(scraperConfig);
}

function getScraperConfig(rosterName){
  var modulePath = ROSTER_MODULE_LOCATION + rosterName;
  console.log("Loading roster module " + modulePath);
  return require(modulePath);
}

function buildScraper(scraperConfig){
  var baseScraper = new BaseScraper();
  var scraper = _.extend(baseScraper, scraperConfig);
  return scraper;
}

Scrape.prototype.buildScraper = buildScraper;

module.exports = Scrape