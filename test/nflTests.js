var expect = require("chai").expect;

describe("NFL Scraper", function() {
  var scraper = require('../lib/scrapers/nfl');  
  
  it("Srape should load the nfl scraper with no issues.", function() {
    var nfl = scrape("nfl", {autoLoad: false});
    
    expect(nfl).to.not.equal(null);
    expect(nfl).to.not.equal(undefined);
  });
  
});

