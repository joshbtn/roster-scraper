'use strict';

const expect = require("chai").expect;
const fs = require('fs');
const ScrapeService = require(__dirname + '/../lib/ScrapeService');

var eaglesTest = {
  "team": [
    {
      "name": "Eagles",
      "uri": "",
      "roster": {
        "uri": "",
        "document": fs.readFileSync(__dirname + "/assets/nfl_eagles.html").toString(),
        "dataSelector" : {
          "number" : "table tbody tr td.col-jersey",
          "name" : "table tbody tr td.col-name a span",
          "position" : "table tbody tr td.col-position",
          "weight" : "table tbody tr td.col-weight",
          "height" : "table tbody tr td.col-height",
          "age" : "table tbody tr td.col-bd",
          "experience" : "table tbody tr td.col-exp",
          "college" : "table tbody tr td.col-college",
          "squad" : function(window, currentRowIndex, fullElementArray) {
            var $ = window.$,
                currentRow = "table tbody tr:eq(" + currentRowIndex + ")",
                $squadHeader = $(currentRow).closest('h2');

            return  "Active";
          }
        }
      }
    }
  ]
}

describe("scraperService.Scrape", function() {
  var scrapeService = new ScrapeService(null);
  
  it("Should return results for the nfl eagles test", function(){
    var scraper = scrapeService.scrape(eaglesTest);
  
    scraper.scrape();
    
    var data = scraper.getData();
    
    expect(data.length).to.be.equal(9);
    expect(data[0]).to.not.equal(undefined);
    expect(data[0].length).to.be.above(10);
  })
  
});