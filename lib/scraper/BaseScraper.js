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
        return this._data;
    }
    
    this.getData = function(){
        return this._data;
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
        data.push(scrapedData);
    }
}

var scrapeHtml = BaseScraper.scrapeHtml = BaseScraper.prototype.scrapeHtml = function(html, selectors, options){
    var defaultOpts = {headings: false};
    options = underscore.extend(options, defaultOpts);
    
    var window = Dom.getDomWithJquery(html),
        elementArray = [],
        normalizedElementArray = [],
        selectorIndex = 0,
        selector,
        dataArray = [];
    
    for(;selectorIndex < selectors.length; selectorIndex += 1){
        selector = selectors[selectorIndex];
        
        if(typeof selector === 'string'){
            elementArray.push(window.$(selector));
        } else if ( typeof selector === 'function' ){
            elementArray.push(selector); //Defer callback until rendering data
        }
    }
    
    
    var emptyDataElement = window.$('');
    normalizedElementArray = DataUtil.normalize2dArrayLength(normalizedElementArray, emptyDataElement);
    
    //TODO render data
    //function(window, currentElement, currentIndex, fullElementArray)
    
    var elementIndex = 0,
        currentElement;
    
    for(; elementIndex < normalizedElementArray.length; elementIndex += 1){
        currentElement = normalizedElementArray[elementIndex];
        
    }
    
    //return data
    
}


BaseScraper.prototype.load = function(){
    
}


module.exports = BaseScraper;