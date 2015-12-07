'use strict';

const expect = require("chai").expect;
const fs = require('fs');
const OutputCsv = require(__dirname + "/../lib/OutputCsv.js");
const Scraper = require(__dirname + "/../lib/Scraper.js");

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

describe("outputCsv", function() {
  
  var scraper = new Scraper(eaglesTest);
  var outputCsv = new OutputCsv(scraper);
  
  describe("get", function(){
      it("should return data formated as csv.", function(){
        var actual = outputCsv.get();
        expect(actual.length).to.be.above(1);
      });
  })
 
});