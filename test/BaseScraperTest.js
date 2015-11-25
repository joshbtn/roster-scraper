'use strict';

var expect = require("chai").expect,
    fs = require('fs'),
    BaseScraper = require(__dirname + "/../lib/scraper/BaseScraper.js");

describe("BaseScraper.scrapeHtml", function() {
  
  it("should return 3 rows of scraped data for test 1", function(){
    var colSelectors = {
      id: "tr td:nth-child(1)",
      name: "tr td:nth-child(2)",
      memo: "tr td:nth-child(3)"
    }
    
    var results = BaseScraper.scrapeHtml(htmlTest1, colSelectors);
    
    expect(results.length).to.equal(3);
  });
  
  // End of tests
  
  beforeEach(function(){
   
  });
  
  afterEach(function(){
    
  });
  
  var htmlTest1 = fs.readFileSync(__dirname + "/assets/BaseScraper_Test1.html");
  
});

