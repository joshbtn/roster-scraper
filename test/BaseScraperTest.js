'use strict';

var expect = require("chai").expect,
    fs = require('fs'),
    Dom = require(__dirname + "/../lib/util/Dom.js"),
    BaseScraper = require(__dirname + "/../lib/scraper/BaseScraper.js"),
    htmlTest1 = fs.readFileSync(__dirname + "/assets/BaseScraper_Test1.html"),
    htmlTest2 = fs.readFileSync(__dirname + "/assets/BaseScraper_Test2.html");

describe("BaseScraper.scrapeHtml", function() {
  
  it("should return 3 rows of scraped data for test 1", function(){
    var colSelectors = {
      id: "tr td:nth-child(1)",
      name: "tr td:nth-child(2)",
      memo: "tr td:nth-child(3)"
    }
    
    var results = BaseScraper.scrapeHtml(htmlTest1, colSelectors);
    
    expect(results.length).to.equal(3);
  });
  
  it("should return column based on custom callback for test 2", function(){
    var colSelectors = {
      first: "tr td:nth-child(1)",
      second: "tr td:nth-child(2)",
      sum: function(window, currentRowIndex, fullElementArray){
        var elementFirst = fullElementArray[0][currentRowIndex],
            elementSecond = fullElementArray[1][currentRowIndex],
            numFirst = parseInt(elementFirst.innerHTML),
            numSecond = parseInt(elementSecond.innerHTML);
        
        return numFirst + numSecond; 
      }
    }
    
    var results = BaseScraper.scrapeHtml(htmlTest2, colSelectors);
    
    expect(results[2][0]).to.equal(2);
    expect(results[2][1]).to.equal(4);
    expect(results[2][2]).to.equal(6);
  });
  
});

describe("BaseScraper.getElementArray", function(){
  it("should get an element array for test1", function(){
    var colSelectors = {
      id: "tr td:nth-child(1)",
      name: "tr td:nth-child(2)",
      random: function(){return "foo"},
      memo: "tr td:nth-child(3)"
    };
    
    var window = Dom.getDomWithJquery(htmlTest1),
        elementArray = BaseScraper.getElementArray(window, colSelectors);
    
    expect(elementArray[0][2].innerHTML).to.equal('77de68daecd823babbb58edb1c8e14d7106e83bb');
    expect(elementArray[1].length).to.equal(3);
    expect(typeof elementArray[2]).to.equal('function');
    expect(elementArray[3].length).to.equal(3);

  });
});

describe("baseScraper.scrape", function() {
  it("should scrape the test eagles roster",function(){
    var scrapper,
        config = eaglesTest,
        data;
    
      scrapper= new BaseScraper(config);
      
      data = scrapper.scrape();
      
      expect(false).to.equal(true)
  });
});

var eaglesTest = {
  "team": [
    {
      "name": "Eagles",
      "uri": "",
      "roster": {
        "uri": "",
        "document": fs.readFileSync(__dirname + "/assets/nfl_eagles.html"),
        "dataSelector" : {
          "number" : "table tbody tr td.col-jersey",
          "name" : "table tbody tr td.col-name",
          "position" : "table tbody tr td.col-position",
          "weight" : "table tbody tr td.col-weight",
          "height" : "table tbody tr td.col-height",
          "age" : "table tbody tr td.col-bd",
          "experience" : "table tbody tr td.col-exp",
          "college" : "table tbody tr td.col-college",
          "squad" : function($, currentElement, currentIndex, fullElementArray) {
            var currentRow = "table tbody tr:eq(" + index + ")",
                $squadHeader = $(currentRow).closest('h2');

            return  $squadHeader.text();
          }
        }
      }
    }
  ]
}