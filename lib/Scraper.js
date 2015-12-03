'use strict';

var Dom = require('./Dom');
var DataUtil = require('./Data');
var util = require('util');
var underscore = require("underscore");
var EventEmitter = require('events');

/**
 * 
 * @class Scraper
 * @param {Object} scraperConfig the configuration file that builds a scraper.  These should live under the /roster folder.
 * @constructor
 * @module roster-scraper
 */
function Scraper( scraperConfig ){
    var _data = [];
    var _config = scraperConfig;
    
    this.getConfig = function(){
        return _config;
    }
    
    this.setConfig = function(config){
        _config = config;
    }
    
    this.setData = function(data){
        _data = data;
    }
    
    this.getData = function(){
        return _data;
    }
    
    EventEmitter.call(this);
}

util.inherits(Scraper, EventEmitter);

Scraper.prototype.scrape = function(){
    
    var teams = this.getConfig().team,
        team,
        scrapedData,
        teamIndex = 0;

    for(; teamIndex < teams.length; teamIndex += 1){
        team = teams[teamIndex];
        scrapedData = scrapeHtml(team.roster.document, team.roster.dataSelector);
        this.setData(this.getData().concat(scrapedData));
    }
    
    return this.getData();
}

var getElementArray = Scraper.getElementArray = function(window, selectors){
    
    var
        elementArray = [],
        selector,
        selectorName,
        elements;
    
    for(selectorName in selectors){
        selector = selectors[selectorName];
        
        if(typeof selector === 'string'){
            elements = window.$.makeArray(window.$(selector));
            elementArray.push(elements);
        } else if ( typeof selector === 'function' ){
            elementArray.push(selector); //Defer callback until rendering data
        }
    }
    
    return elementArray;
}

var scrapeHtml = Scraper.scrapeHtml = function(html, selectors, options){
    var defaultOpts = {headings: false};
    options = underscore.extend(options, defaultOpts);
    
    var window = Dom.getDomWithJquery(html),
        elementArray = getElementArray(window, selectors);
    
    var emptyDataElement = null,
        normalizedElementArray  = [];
        
    normalizedElementArray = DataUtil.normalize2dArrayLength(elementArray, emptyDataElement);
    
    var columnIndex = 0,
        elementIndex = 0,
        currentColumn,
        currentElement,
        dataString = "",
        dataArray = [];
        
    //TODO extact this into it's own method
    for(; columnIndex < normalizedElementArray.length; columnIndex += 1){
        currentColumn = normalizedElementArray[columnIndex];
        dataArray.push([]);
        
        for(elementIndex = 0; elementIndex < currentColumn.length; elementIndex += 1){
            if(typeof currentColumn === 'function'){
                currentElement = currentColumn;
                //TODO pass callback a row object for convienence
                dataString = currentElement(window, elementIndex, normalizedElementArray); 
                dataArray[columnIndex].push(dataString);
                continue;
            }
            
            currentElement = currentColumn[elementIndex];
            
            dataString = currentElement && currentElement.innerHTML ? currentElement.innerHTML.trim() : "";
            dataArray[columnIndex].push(dataString);
        }
    }
    
    return dataArray;
}

module.exports = Scraper;