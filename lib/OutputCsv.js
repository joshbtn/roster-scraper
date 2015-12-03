'use strict';

var Output = require('Output'),
    _ = require('underscore'),
    fs = require("fs"),
    util = require('util');

/**
 * Output to Csv
 *
 * @class CsvOutput
 * @param {Scraper} [scraper] The scraper who's data you'd like to output.
 * @param {Object} [options] options such as the output path
 * @param {Object} [options.path] the path to output the csv to.
 * @constructor
 * @module roster-scraper
 */
function CsvOutput(scraper, options){
    Output.call(this, scraper);
    
    var opts = _.extend(defaultOptions, options);
    
    /**
     * Set the named option.
     * 
     * @method
     * @param 
     */
    this.setOption = function(optionName, optionValue){
        if(typeof options[optionName] !== 'undefined'){
            opts[optionName] = optionValue;
        }
    }
    
    this.getPath = function(){
        return opts.path;
    }
}

util.inherits(CsvOutput, Output);

CsvOutput.prototype.Write = function(){
    //todo make this configurable
    var path = __dirname + "/../../../Output.csv";
    
    var writeStream = fs.createWriteStream(path);
    
    this.done();
}

exports.module = Output;