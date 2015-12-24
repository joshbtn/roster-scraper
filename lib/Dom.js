'use strict';

var jsdom = require("jsdom");
var fs = require("fs");
var jquery = fs.readFileSync(__dirname + "/../node_modules/jquery/dist/jquery.js", "utf-8");
var cheerio = require('cheerio');

function Dom(){
    
}

Dom.getDom = function(html){
    return cheerio.load(html);
};

Dom.getTextNodesIn = function(el) {
    return el.find(":not(iframe)").addBack().contents().filter(function() {
        return this.nodeType == 3;
    });
};

module.exports = Dom;