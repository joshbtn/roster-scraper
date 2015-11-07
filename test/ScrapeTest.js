var expect = require("chai").expect;

describe("Scrape", function() {
  var scrape = require('../lib/Scrape');  
  
  it("Srape should load the nfl scraper with no issues.", function() {
    var nfl = scrape("NFL", {autoLoad: false});
    
    expect(nfl).to.not.equal(null);
    expect(nfl).to.not.equal(undefined);
  });
  
});

