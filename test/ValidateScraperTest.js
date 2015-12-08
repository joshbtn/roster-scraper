'use strict';

const ValidateScraper = require(__dirname + '/../lib/ValidateScraper');
const expect = require('chai').expect;
const fs = require('fs');
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
};

describe("ValidateScraper", function(){
   var eaglesTestScraper = new Scraper(eaglesTest);
   var validateScraper = new ValidateScraper(eaglesTestScraper); 
   
   it("should be true", function(){
       var isValid = validateScraper.validate();
       expect(isValid).to.be.true();
   });
   
});