'use strict';

var ROSTER_LOCATION = __dirname + "/../rosters/",
    _ = require('underscore'),
    Scraper = require('./Scraper'),
    EventEmitter = require('events'),
    util = require('util');

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
function ScrapeService(dataOutput){
    this.dataOutput = dataOutput;
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
ScrapeService.prototype.scrape = function(config, options){
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
      this.load();
    }
    
    return scraper;
};

ScrapeService.prototype.load = function(){
    throw new Error("not implimented");
    //this.emit(EVT_load);
};

module.exports = ScrapeService;