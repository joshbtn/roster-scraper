var expect = require("chai").expect;

describe("Scrape", function() {
  var scrape = require('../lib/Scrape');  
  
  it("Srape should load the nfl scraper with no issues.", function() {
    var nfl = scrape("nfl", {autoLoad: false});
    expect(nfl.autoLoad).to.not.equal(null);
  });
  
});

