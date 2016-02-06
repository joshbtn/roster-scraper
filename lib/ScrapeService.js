'use strict';

var ROSTER_LOCATION = __dirname + "/../rosters/";
var _ = require('underscore');
var Scraper = require('./Scraper');
var EventEmitter = require('events');
var ValidateScraper = require('./ValidateScraper');
var util = require('util');
var request = require('request');
var async = require('async');

/**
 * Fired when all roster documents have loaded.
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
function ScrapeService(config, dataOutput){
    this.dataOutput = dataOutput;
    var _config = typeof config === "string" ? getScraperConfig(config) : config;
    
    this.getConfig = function(){
      return _config;
    }
    
    this.setConfig = function (cfg){
      _config = cfg;
    }
    
    EventEmitter.call(this);
}

util.inherits(ScrapeService, EventEmitter);

function getScraperConfig(rosterName){
  var rosterPath = ROSTER_LOCATION + rosterName;
  console.log("Loading roster module " + rosterPath);
  return require(rosterPath);
}

/**
* This is the main method of this library.  Scrape will accpt a string with the name of a roster, which will look to the "rosters" folder and load the JS file with the provided name.
* this can span multiple lines.
* 
* @example
*     var scrapeService = new ScrapeService(websiteLoader, consoleOutput);
*     var scrapeService.Scrape("NFL", {autoLoad: true}); //
*
* @method Scrape
* @param {Object|String} config This can be a string that contains the name of the roster to load or the actual roster config object.
* @param {Objet} [options] Options for scrape
* @param {Objet} [options.autoload=false] set to true if you want to call load immediately
* @param {Objet} [options.onLoad] callback for load event.
* @return {Scraper} Returns true on success
*/
ScrapeService.prototype.scrape = function(){
    
    var config = this.getConfig();
    var scraperConfig;

    if(typeof config === 'string') {
      scraperConfig = getScraperConfig(config);
    } else if (typeof config === 'object') {
      scraperConfig = config;
    } else {
      throw new Error("The scraper config must be a string or an object. found " + (typeof config) + " instead");
    }
    
    var scraper =  new Scraper(scraperConfig);
    
    var validateScraper = new ValidateScraper(scraper);
    
    if(!validateScraper.validate()){
      var errorMessage = "The scraper is not valid.  Please check that your colomns line up across all teams.";
      throw new Error(errorMessage);
    }
    
    scraper.scrape();
    
    
    return scraper;
    
    
};

ScrapeService.prototype.load = function(){
  //request('http://www.google.com', function (error, response, body) {
  //  if (!error && response.statusCode == 200) {
  //    console.log(body) // Show the HTML for the Google homepage.
  //  }
  //})
  //TODO load data from the web.
  var config = this.getConfig(),
      requestTasks = []
  
  config.team.every(function(curTeam, index, array){
    var url = curTeam.roster.uri;
    
    requestTasks.push(function(callback){
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(error, response)
          return
        }
        curTeam.roster.data = body;
        
        callback(null, body);
      });
    });
    
  },this)
  
  async.series(requestTasks, function(err, results){
    this.emmit(EVT_load);
  });
  
}

//TODO add write to file method

module.exports = ScrapeService;