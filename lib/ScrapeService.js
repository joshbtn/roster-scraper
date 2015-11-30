'use strict';

var ROSTER_LOCATION = "./scraper/",
    _ = require('underscore'),
    http = require('http'),
    Scraper = require("Scraper"),
    EventEmitter = require('events'),
    util = require('util');


function ScrapeService(){
    EventEmitter.call(this);
}

util.inherits(ScrapeService, EventEmitter);

function getScraperConfig(rosterName){
  var rosterPath = ROSTER_LOCATION + rosterName;
  console.log("Loading roster module " + rosterPath);
  return require(rosterPath);
}

ScrapeService.Scrape = function(config, options){
    var defaultOptions = {autoLoad: false};
    options = _.extend(defaultOptions, options);
    
    var scraperConfig;

    if(typeof config === 'string') {
      scraperConfig = getScraperConfig(config);
    } else if (typeof config === 'object') {
      scraperConfig = config;
    } else {
      throw new Error("config must be a string or an object");
    }
    
    var scraper =  new Scraper(scraperConfig);
    
    if(options.autoLoad){
      scraper.loadDocuments();
    }
    
    return scraper;
}

ScrapeService.load = function(){
    throw new Error("not implimented");
    this.emit('loaded')
}

module.exports = Scrape;