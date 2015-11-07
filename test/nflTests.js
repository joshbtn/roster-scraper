var expect = require("chai").expect;

describe("NFL Scraper", function() {
  var scraper = require('../lib/scrapers/NFL');  
  
  it("Srape should load the nfl scraper with no issues.", function() {
    
    expect(scraper).to.not.equal(null);
  });
  
});

