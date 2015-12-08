'use strict';

function ValidateScraper(scraper){
    var _scraper = scraper;
    
    this.getScraper = function(){
        return _scraper;
    }
    
    this.setScraper = function(scraper){
        _scraper = scraper;
    }
}

ValidateScraper.prototype.validate = function(){
    // TODO make sure all headings (or columns) are in the same order and line up.
    // No warnings just invalid
    throw new Error("validate not implimented.");
};

module.exports = ValidateScraper;