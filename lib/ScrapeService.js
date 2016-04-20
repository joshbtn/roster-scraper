'use strict';

(function(){

var _ = require('underscore');
var Scraper = require('./Scraper');
var EventEmitter = require('events');
var ValidateScraper = require('./ValidateScraper');
var util = require('util');
var fs = require('fs');
var request = require('request');
var async = require('async');

/**
 * Fired when all documents have loaded.
 *
 * @event load
 * @param {Object} the scraper object.
 */
var EVT_load = 'load';

/**
 * Fired when an error occurs...
 *
 * @event load
 * @param {String} msg A description of the error
 */
var EVT_error = 'error';

/**
 * ScrapeService contains all high level scrape calls and events.
 *
 * @class ScrapeService
 * @constructor
 */
function ScrapeService(config){
    
    var _config = typeof config === "string" ? getScraperConfig(config) : config;
    
    this.getConfig = function(){
      return _config;
    }
    
    this.setConfig = function (cfg){
      _config = cfg;
    }
    
    this.scraper = null;
    
    this.createScraper();
    
    EventEmitter.call(this);
}

util.inherits(ScrapeService, EventEmitter);

function getScraperConfig(path){
  fs.accessSync(path, fs.F_OK);
  console.log("Loading config " + path);
  return require(path);
}

ScrapeService.prototype.scrape = function(){
    
    this.scraper.scrape();
    
    
    return this.scraper;
    
};

ScrapeService.prototype.getScraper = function(){
  return this.scraper;
}

ScrapeService.prototype.createScraper = function(){
  var config = this.getConfig();
  var scraperConfig;

  if(typeof config === 'string') {
    scraperConfig = getScraperConfig(config);
  } else if (typeof config === 'object') {
    scraperConfig = config;
  } else {
    throw new Error("The scraper config must be a string or an object. found " + (typeof config) + " instead");
  }
  
  this.scraper = new Scraper(scraperConfig);
  
  var validateScraper = new ValidateScraper(this.scraper);
  
  if(!validateScraper.validate()){
    var errorMessage = "The scraper is not valid.  Please check that your colomns line up across all sites.";
    throw new Error(errorMessage);
  }
}

ScrapeService.prototype.load = function(){
  var config = this.getConfig(),
      requestTasks = []
  
  config.every(function(curSite, index, array){
    var url = curSite.uri;
    
    requestTasks.push(function(callback){
      request(url, function (error, response, body) {
        if (error || response.statusCode !== 200) {
          callback(error, response)
          return
        }
        curSite.document = body;
        
        callback(null, body);
      });
    });
    
  },this)
  var me = this;
  
  async.series(requestTasks, function(err, results){
    me.emit(EVT_load);
  });
  
}

//TODO add write to file method

module.exports = ScrapeService;

  
}());