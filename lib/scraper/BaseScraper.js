'use strict';

var Dom = require('../util/Dom');
var DataUtil = require('../util/Data');
var jsdom = require("jsdom");
var util = require("util");
var underscore = require("underscore");
var fs = require("fs");
var EventEmitter = require('events');
var jquery = fs.readFileSync(__dirname + "/../../node_modules/jquery/dist/jquery.js", "utf-8");

function BaseScraper( config ){
    var data = [];
    this.config = config;
    EventEmitter.call(this);
    
    this.setData = function(){
        return data;
    }
    
    this.getData = function(){
        return data;
    }

}

util.inherits(BaseScraper, EventEmitter);

BaseScraper.prototype.scrape = function(){
    var teams = this.team,
        team = null,
        scrapedData,
        teamIndex;
    
    for(teamIndex = 0 ; teamIndex < teams.length; teamIndex += 1){
        team = teams[teamIndex];
        scrapedData = scrapeHtml(team.roster.document);
        this.setData(this.getData().push(scrapedData));
    }
}

var getElementArray = BaseScraper.getElementArray = function(html, selectors){
    
    var window = Dom.getDomWithJquery(html),
        elementArray = [],
        selector,
        selectorName,
        elements;
    
    for(selectorName in selectors){
        selector = selectors[selectorName];
        
        if(typeof selector === 'string'){
            elements = window.$(selector)//window.$.makeArray(window.$(selector));
            elementArray.push(elements);
        } else if ( typeof selector === 'function' ){
            elementArray.push(selector); //Defer callback until rendering data
        }
    }
    
    return elementArray;
}

var scrapeHtml = BaseScraper.scrapeHtml = function(html, selectors, options){
    var defaultOpts = {headings: false};
    options = underscore.extend(options, defaultOpts);
    
    var elementArray = getElementArray(html, selectors);
    
    var emptyDataElement = window.$(''),
        normalizedElementArray  = [];
        
    normalizedElementArray = DataUtil.normalize2dArrayLength(elementArray, emptyDataElement);
    
    var columnIndex = 0,
        elementIndex = 0,
        currentColumn,
        currentElement,
        dataArray = [];
    
    for(; columnIndex < normalizedElementArray.length; columnIndex += 1){
        currentColumn = normalizedElementArray[columnIndex];
        dataArray.push([]);
        console.log(typeof currentColumn)
        for(elementIndex = 0; elementIndex < currentColumn.length; elementIndex += 1){
            currentElement = currentColumn[elementIndex];
            
            if( typeof currentElement === 'object' && currentElement.text ) {
                dataArray[columnIndex].push(currentElement.text());
            } else if ( typeof currentElement === 'function' ) {
                dataArray[columnIndex].push(currentElement(window, elementIndex, normalizedElementArray));
            } else {
                throw new Error("Error with selector object.  Object must be a function or an object with a text function.");
            }
        }
    }
    console.log(dataArray)
    return dataArray;
}


BaseScraper.prototype.load = function(){
    
}


module.exports = BaseScraper;