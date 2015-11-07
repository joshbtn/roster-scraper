describe("Scraper.Scrape", function() {
  var Scraper = require('../lib/Scraper'),
      nflRosters = require('../lib/rosters/nfl');
  
  nflRosters.team[0].roster.document = "TODO, load static file";
  var results = Scraper.scrape(nflRosters, {autoLoad: false});
  
  it("Should autoLoad document for NFL team Eagles.", function() {
    expect(true).toBe(true);
  });
});

