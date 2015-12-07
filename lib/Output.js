'use strict';

const EventEmitter = require('events');
const util = require('util');

/**
 * Fired when output is done writing.
 *
 * @event error
 * @param {String} msg A description of...
 */
var EVT_done = 'done';

/**
 * Base class for outputs
 *
 * @class Output
 * @param {Scraper} [scraper] The scraper who's data you'd like to output.
 * @constructor
 * @module roster-scraper
 */
function Output(scraper){
    var _scraper = scraper;
    
    EventEmitter.call(this);
    
    this.setScraper = function(scraper){
        _scraper = scraper;
    };
    
    this.getScraper = function(){
        return _scraper;
    };
}

util.inherits(Output, EventEmitter);

Output.prototype.done = function(){
    this.emit(EVT_done);
};

Output.prototype.write = function(){
    throw new Error( "Write not implimented" );
};

Output.prototype.get = function () {
    throw new Error( "Get not implimented" );
};

module.exports = Output;