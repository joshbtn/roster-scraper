'use strict';

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