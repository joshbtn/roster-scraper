var expect = require("chai").expect,
    fs = require('fs');

describe("Scrape", function() {
  
  var scrape = require('../lib/Scrape');
  
  //-------------------- Tests start here -------------------------
  
  
  it("should load roster with no issues", function(){
    var scraper = scrape("NFL", {autoLoad: false});
    
    scraper.loadRosters();
    
    var firstDocumentCharCount = scraper.team[0].roster.document;
    console.log(scraper.team[0])
    expect(firstDocumentCharCount).to.be.above(1);
  });
  
});

