'use strict';

const Output = require('./Output');
const _ = require('underscore');
const fs = require("fs");
const util = require('util');

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
function OutputCsv(scraper, options){
    var defaultOptions = {};
    var _scraper = scraper;
    
    Output.call(this, scraper);
    
    var opts = _.extend(defaultOptions, options);
    
    this.setOption = function(optionName, optionValue){
        if(typeof options[optionName] !== 'undefined'){
            opts[optionName] = optionValue;
        }
    };
    
    this.getPath = function(){
        return opts.path;
    };
    
    this.setPath = function(path){
        this.setOption("path", path);
    };
    
    this.getScraper = function(){
        return _scraper;
    }
}

util.inherits(OutputCsv, Output);

OutputCsv.prototype.write = function(){
    //todo make this configurable
    var path = __dirname + "/../../../Output.csv";
    
    var writeStream = fs.createWriteStream(path);
    
    this.done();
};

OutputCsv.prototype.get = function(){
    var scraper = this.getScraper();
    
    if(scraper.isDirty()){
        scraper.scrape();
    }
    
    var data = scraper.getData();
    
    var csvString = data.reduce(dataArrayToCsvString);
    
    return csvString;
};

function dataArrayToCsvString(previousValue, currentValue, currentIndex, array){
    currentValue.forEach
    //return previousValue + "\n" + currentValue.join(",");
}

module.exports = OutputCsv;