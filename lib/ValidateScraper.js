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
    let headings = scraper.getHeadings();
    let isValid = null;
    let lastSetOfHeadings = null;
    
    headings.forEach(function(currentHeadings, index, array){
        isValid = lastSetOfHeadings === null || currentHeadings.join() === lastSetOfHeadings.join();
        lastSetOfHeadings = currentHeadings;
    });
    
    return isValid;
};

module.exports = ValidateScraper;