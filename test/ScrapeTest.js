var expect = require("chai").expect;

describe("Scrape", function() {
  var scrape = require('../lib/Scrape');  
  
  it("Srape should load the nfl scraper with no issues.", function() {
    var nfl = scrape("NFL", {autoLoad: false});
    
    expect(nfl).to.not.equal(null);
    expect(nfl).to.not.equal(undefined);
  });
  
   it("should scrape eagles test roster", function(){
    var nfl = scrape("NFL", {autoLoad: false});
    
    var eaglesDocument = fs.readFileSync('./assets/nfl_eagles.html').toString();
    
    nfl.getTeam('eagles').document = eaglesDocument;
    
    var data = scraper.getData();
  });
  
});

