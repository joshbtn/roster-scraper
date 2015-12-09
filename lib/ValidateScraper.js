'use strict';

function ValidateScraper(scraper){
    let _scraper = scraper;
    
    this.getScraper = function(){
        return _scraper;
    };
    
    this.setScraper = function(scraper){
        _scraper = scraper;
    };
}

ValidateScraper.prototype.validate = function(){
    let scraper = this.getScraper();
    let teams = scraper.getConfig().team;
    let headings = scraper.getHeadings();
    let isValid = null;
    let lastSetOfHeadings = scraper.getHeadings(0);
    
    headings.forEach(function(currentValue, index, array){
        
    });
    
    return isValid;
};

module.exports = ValidateScraper;