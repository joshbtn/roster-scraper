'use strict';

const expect = require("chai").expect;
const Dom = require(__dirname + "/../lib/Dom");
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
          "squad" : function($, currentRowIndex, fullElementArray) {
            var rows = $("table tbody tr"),
                currentRow = rows.eq(currentRowIndex),//:eq(" + currentRowIndex + ")",
                table = $(currentRow).closest('table'),
                squadHeader = $(table).prevAll('.mod-title-nobackground').find('h2'),
                squad = Dom.getTextNodesIn(squadHeader).text();
            
            return  squad;
          }
        }
      }
    }
  ]
}

describe("ScraperService", function() {
  
  describe("scrape()", function() {
      context("with no output", function(){
        
        var noOutput = null;
        var scrapeService = new ScrapeService(noOutput);
        
        it("Should return expected data array for the nfl eagles test", function(){
          var scraper = scrapeService.scrape(eaglesTest);
        
          var data = scraper.getData();
          
          expect(data.length).to.be.equal(9);
          expect(data[0]).to.not.equal(undefined);
          expect(data[0].length).to.be.above(10);
        })
      });
  })
  
});