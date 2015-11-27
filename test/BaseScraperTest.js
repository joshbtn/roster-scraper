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
      sum: function(window, currentIndex, fullElementArray){
        var currentRow = fullElementArray[currentIndex],
            num1 = parseInt(currentRow[0].text()),
            num2 = parseInt(currentRow[1].text())
        
        return num1 + num2; 
      }
    }
    
    var results = BaseScraper.scrapeHtml(htmlTest2, colSelectors);
    
    expect(results[0][3]).to.equal(2);
    expect(results[1][3]).to.equal(4);
    expect(results[2][3]).to.equal(6);
  });
  
  it("should return column based on custom callback for test 2 in the right column position", function(){
    var colSelectors = {
      first: "tr td:nth-child(1)",
      sum: function(window, currentIndex, fullElementArray){
        var currentRow = fullElementArray[currentIndex],
            num1 = parseInt(currentRow[0].text()),
            num2 = parseInt(currentRow[1].text())
        
        return num1 + num2; 
      },
      second: "tr td:nth-child(2)",
    }
    
    var results = BaseScraper.scrapeHtml(htmlTest2, colSelectors);
    
    expect(results[0][2]).to.equal(2);
    expect(results[1][2]).to.equal(4);
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