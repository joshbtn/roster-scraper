describe("Scrape", function() {
  var scrape = require('lib/Scrape');  
  
  it("Srape should load the nfl scraper with no issues.", function() {
    var nfl = Scrape("nfl", {autoLoad: false});
    expect(nfl.autoLoad).toNotBe(null);
  });
  
});

