'use strict';

const ValidateScraper = require(__dirname + '/../lib/ValidateScraper');
const expect = require('chai').expect;
const Scraper = require(__dirname + "/../lib/Scraper.js");

var eaglesTest = {
  "team": [
    {
      "name": "Eagles",
      "uri": "",
      "roster": {
        "uri": "",
        "document": "",
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

var twoTeamTest = {
  "team": [
    {
      "name": "Eagles",
      "uri": "",
      "roster": {
        "uri": "",
        "document": "",
        "dataSelector" : {
          "number" : "table tbody tr td.col-jersey",
          "name" : "table tbody tr td.col-name a span",
          "position" : "table tbody tr td.col-position",
          "weight" : "table tbody tr td.col-weight",
          "height" : "table tbody tr td.col-height",
          "age" : "table tbody tr td.col-bd",
          "experience" : "table tbody tr td.col-exp",
          "college" : "table tbody tr td.col-college"
          
        }
      }
    },
    {
      "name": "Seahawks",
      "uri": "",
      "roster": {
        "uri": "",
        "document": "",
        "dataSelector" : {
          "foo": "",
          "number" : "table tbody tr td.col-jersey",
          "name" : "table tbody tr td.col-name a span",
          "position" : "table tbody tr td.col-position",
          "weight" : "table tbody tr td.col-weight",
          "height" : "table tbody tr td.col-height",
          "age" : "table tbody tr td.col-bd",
          "experience" : "table tbody tr td.col-exp",
          "college" : "table tbody tr td.col-college"
          
        }
      }
    }
  ]
};

var threeTeamTest = {
  "team": [
    {
      "name": "Eagles",
      "uri": "",
      "roster": {
        "uri": "",
        "document": "",
        "dataSelector" : {
          "number" : "table tbody tr td.col-jersey",
          "name" : "table tbody tr td.col-name a span",
          "position" : "table tbody tr td.col-position",
          "weight" : "table tbody tr td.col-weight",
          "height" : "table tbody tr td.col-height",
          "age" : "table tbody tr td.col-bd",
          "experience" : "table tbody tr td.col-exp",
          "college" : "table tbody tr td.col-college"
          
        }
      }
    },
    {
      "name": "Seahawks",
      "uri": "",
      "roster": {
        "uri": "",
        "document": "",
        "dataSelector" : {
          "number" : "table tbody tr td.col-jersey",
          "name" : "table tbody tr td.col-name a span",
          "position" : "table tbody tr td.col-position",
          "weight" : "table tbody tr td.col-weight",
          "height" : "table tbody tr td.col-height",
          "age" : "table tbody tr td.col-bd",
          "experience" : "table tbody tr td.col-exp",
          "college" : "table tbody tr td.col-college"
          
        }
      }
    },
    {
      "name": "Bears",
      "uri": "",
      "roster": {
        "uri": "",
        "document": "",
        "dataSelector" : {
          "number" : "table tbody tr td.col-jersey",
          "name" : "table tbody tr td.col-name a span",
          "position" : "table tbody tr td.col-position",
          "weight" : "table tbody tr td.col-weight",
          "height" : "table tbody tr td.col-height",
          "age" : "table tbody tr td.col-bd",
          "experience" : "table tbody tr td.col-exp",
          "college" : "table tbody tr td.col-college"
          
        }
      }
    }
  ]
};

describe("ValidateScraper", function(){
   
   
   describe("#validate()", function(){
     context("scraper with with 1 team", function(){
       var eaglesTestScraper = new Scraper(eaglesTest);
       var validateScraper = new ValidateScraper(eaglesTestScraper);
        
       it("should return true", function(){
           var isValid = validateScraper.validate();
           expect(isValid).to.be.equal(true);
       });
     })
     
     context("scraper with with 2 teams with missmatched columns", function(){
       var testScraper = new Scraper(twoTeamTest);
       var validateScraper = new ValidateScraper(testScraper);
       
       it("should return false", function(){
           var isValid = validateScraper.validate();
           expect(isValid).to.be.equal(false);
       });
     })
     
     context("scraper with with 3 teams with matching columns", function(){
       var testScraper = new Scraper(threeTeamTest);
       var validateScraper = new ValidateScraper(testScraper);
       
       it("should return true", function(){
           var isValid = validateScraper.validate();
           expect(isValid).to.be.equal(true);
       });
     })
   })
   
   
   
});