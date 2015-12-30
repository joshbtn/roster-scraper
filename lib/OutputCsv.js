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
    var defaultOptions = {path: __dirname + "/../../../Output.csv"};
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
    var path = this.getPath();
    var self = this;
    var writeStream = fs.createWriteStream(path);
    writeStream.on('finish', this.done.bind(self));
    writeStream.end(this.get());
};


OutputCsv.prototype.get = function(){
    var scraper = this.getScraper();
    
    if(scraper.isDirty()){
        scraper.scrape();
    }
    
    var data = scraper.getData();
    var csvString = tableToCsvString(data);
    
    return csvString;
};

var reduceArrayToCsv = OutputCsv.reduceArrayToCsv = function(prevValue, currentValue){
    return prevValue + "\n" + currentValue.join(',');
}

var tableToCsvString = OutputCsv.tableToCsvString = function(table){
    return pivotTable(table).reduce(reduceArrayToCsv);
}

var pivotTable = OutputCsv.pivotTable = function(table){
    var rowCount = table.getRowCount(),
        colCount = table.getColCount(),
        pivotTable = [],
        curRowIndex = 0,
        cellValue,
        curColIndex;
    
    for(; curRowIndex < rowCount; curRowIndex += 1){
        curColIndex = 0;
        pivotTable.push([]);
        for(; curColIndex < colCount; curColIndex += 1){
            cellValue = table[curColIndex][curRowIndex].toString();
            pivotTable[curRowIndex].push(cellValue);
        }
    }
    
    return pivotTable;
}

module.exports = OutputCsv;