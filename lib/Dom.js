'use strict';

var jsdom = require("jsdom");
var fs = require("fs");
var jquery = fs.readFileSync(__dirname + "/../node_modules/jquery/dist/jquery.js", "utf-8");

function Dom(){
    
}

Dom.getDomWithJquery = Dom.prototype.getDomWithJquery = function(html){
    
    var document = jsdom.jsdom(html);
    var window = document.defaultView;
    
    //Inject jQuery
    var scriptEl = window.document.createElement("script");
    scriptEl.innerHTML = jquery;
    window.document.body.appendChild(scriptEl);

    return window;
};

module.exports = Dom;