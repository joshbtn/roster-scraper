'use strict';

var Dom = require('./Dom');
var DataUtil = require('./Data');
var Table = require('./Table');
var util = require('util');
var underscore = require("underscore");
var EventEmitter = require('events');


/**
 * 
 * @class Scraper
 * @param {Object} scraperConfig the configuration file that builds a scraper. 
 * @constructor
 * @module scraper
 */
function Scraper( scraperConfig, includeHeadings ){
    var _data = new Table();
    var _isDirty = true;
    var _headings;
    var _config = scraperConfig;
    var _includeHeadings = includeHeadings === true;
    
    this.getConfig = function(){
        return _config;
    };
    
    this.setConfig = function(config){
        _isDirty = true;
        _config = config;
    };
    
    this.setData = function(data){
        if(!(data instanceof Table)){
            throw new Error("Data can only be a Table.");
        }
        _isDirty = false;
        _data = data;
    };
    
    this.getData = function(){
        return _data;
    };
    
    this.concatData = function(array){
        if(_data.length == 0){
            Array.prototype.push.apply(_data, array);
            return;
        }
        
        var index = 0;
        var size = _data.length;
        for(; index < size; index += 1){
            Array.prototype.push.apply(_data[index], array[index]);
        }
    }
    
    this.getHeadings = function(index){
        if(Array.isArray(_headings)){
            return _headings[index];
        }
        
        var headings = [];
        var sites = this.getConfig();
        var selectors;
        
        sites.forEach(function(site, index, array){
            selectors = site.dataSelector;
            headings.push(Object.getOwnPropertyNames(selectors));
        });
        
        _headings = headings;
    
        if(index !== null && typeof index !== 'undefined'){
            return _headings[index];
        } else {
            return _headings;
        }
    };
    
    this.isDirty = function(){
        return _isDirty;
    };
    
    this.includeHeadings = function(){
        return _includeHeadings;
    }
    
    EventEmitter.call(this);
}

util.inherits(Scraper, EventEmitter);

Scraper.prototype.scrape = function(){
    
    var sites = this.getConfig(),
        site,
        scrapedData,
        index = 0,
        options = {headings: this.includeHeadings()};

    for(; index < sites.length; index += 1){
        site = sites[index];
        scrapedData = scrapeHtml(site.document, site.dataSelector, options);
        
        this.concatData(scrapedData);
    }
    
    return this.getData();
};

var getElementArray = Scraper.getElementArray = function($, selectors){
    
    var
        elementArray = [],
        selector,
        selectorName,
        elements;
        
    for(selectorName in selectors){
        selector = selectors[selectorName];
        
        if(typeof selector === 'string'){
            elements = $(selector);
            elementArray.push(elements);
        } else if ( typeof selector === 'function' ){
            elementArray.push(selector); //Defer callback until rendering data
        }
    }
    
    return elementArray;
};

var scrapeHtml = Scraper.scrapeHtml = function(html, selectors, options){
    var defaultOpts = {headings: false};
    options = underscore.extend(defaultOpts, options);
    
    var $ = Dom.getDom(html);
    var elementArray = getElementArray($, selectors);
    
    // When you get the array based on selectors many rows will be populated
    // However functions will simply be duplicated for each row.
    var emptyDataElement = null,
        normalizedElementArray  = DataUtil.normalize2dArrayLength(elementArray, emptyDataElement);
    
    var columnIndex = 0,
        elementIndex = 0,
        currentColumn,
        currentElement,
        currentTextNode,
        dataString = "",
        rowCount = DataUtil.getRowCount(normalizedElementArray),
        dataArray = new Table();
        
    //TODO extract this into it's own method
    for(; columnIndex < normalizedElementArray.length; columnIndex += 1){
        currentColumn = normalizedElementArray[columnIndex];
        
        if(options.headings){
            dataArray.push([this.getHeadings(columnIndex)]);
        } else {
            dataArray.push([]);
        }
        
        for(elementIndex = 0; elementIndex < rowCount; elementIndex += 1){
            //Check if currentColumn is a function.
            if(typeof currentColumn === 'function'){
                currentElement = currentColumn;
                dataString = currentElement($, elementIndex, normalizedElementArray); 
                dataArray[columnIndex].push(dataString);
                continue;
            }
            
            currentElement = currentColumn[elementIndex];
            currentTextNode = $(Dom.getTextNodesIn($(currentElement)));
            
            dataString = currentTextNode && currentTextNode.text() ? currentTextNode.text().trim() : "";
            
            dataArray[columnIndex].push(dataString);
        }
    }
    
    return dataArray;
};

module.exports = Scraper;