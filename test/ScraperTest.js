'use strict';

const expect = require("chai").expect;
const fs = require('fs');
const Dom = require(__dirname + "/../lib/Dom");
const Data = require(__dirname + "/../lib/Data");
const Scraper = require(__dirname + "/../lib/Scraper");
const Table = require(__dirname + "/../lib/Table");
const htmlTest1 = fs.readFileSync(__dirname + "/assets/Scraper_Test1.html").toString();
const htmlTest2 = fs.readFileSync(__dirname + "/assets/Scraper_Test2.html").toString();
let eaglesTest = require(__dirname + "/helpers/EaglesTestConfig");

describe("Scraper", function() {
      
  describe("#scrapeHtml()", function() {
    
    it("should return 3 rows of scraped data for test 1", function(){
      var colSelectors = {
        id: "tr td:nth-child(1)",
        name: "tr td:nth-child(2)",
        memo: "tr td:nth-child(3)"
      }
      
      var results = Scraper.scrapeHtml(htmlTest1, colSelectors);
      
      expect(results.length).to.equal(3);
    });
    
    it("should return column based on custom callback for test 2", function(){
      var colSelectors = {
        first: "tr td:nth-child(1)",
        second: "tr td:nth-child(2)",
        sum: function($, currentRowIndex, fullElementArray){
          
          var elementFirst = $(fullElementArray[0][currentRowIndex]),
              elementSecond = $(fullElementArray[1][currentRowIndex]),
              numFirst = parseInt(elementFirst.text()),
              numSecond = parseInt(elementSecond.text());
          
          return numFirst + numSecond; 
        }
      }
      
      var results = Scraper.scrapeHtml(htmlTest2, colSelectors);
      
      expect(results[2][0]).to.equal(2);
      expect(results[2][1]).to.equal(4);
      expect(results[2][2]).to.equal(6);
    });
    
    it("should pass $ to callbacks as a function", function(done){
      var colSelectors = {
        dummy: "tr th:nth-child(1)",
        callback: function($,  currentRowIndex, normalizedElementArray){
          expect($).to.be.a('function');
          var rowCount = Data.getRowCount(normalizedElementArray);
          if(currentRowIndex === rowCount - 1){
            done();
          }
        }
      };
      
      var results = Scraper.scrapeHtml(htmlTest1, colSelectors);
    });
    
    it("should pass currentRowIndex to callbacks as a number", function(done){
      var colSelectors = {
        dummy: "tr th:nth-child(1)",
        callback: function($,  currentRowIndex, fullElementArray){
          expect(currentRowIndex).to.be.a('number');
          var rowCount = Data.getRowCount(fullElementArray);
          if(currentRowIndex === rowCount - 1){
            done();
          }
        }
      }
      
      var results = Scraper.scrapeHtml(htmlTest1, colSelectors);
    });
    
    it("should pass currentRowIndex to callbacks as an array", function(done){
      var colSelectors = {
        dummy: "tr th:nth-child(1)",
        callback: function($,  currentRowIndex, fullElementArray){
          var isArray = Array.isArray(fullElementArray);
          expect(isArray).to.be.equal(true);
          var rowCount = Data.getRowCount(fullElementArray);
          if(currentRowIndex === rowCount - 1){
            done();
          }
        }
      }
      
      var results = Scraper.scrapeHtml(htmlTest1, colSelectors);
    });
    
  });
  
  describe("#getElementArray()", function(){
    it("should get an element array for test1", function(){
      var colSelectors = {
        id: "tr td:nth-child(1)",
        name: "tr td:nth-child(2)",
        random: function(){return "foo"},
        memo: "tr td:nth-child(3)"
      };
      
      var $ = Dom.getDom(htmlTest1),
          elementArray = Scraper.getElementArray($, colSelectors);
      
      expect($(elementArray[0][2]).text()).to.equal('77de68daecd823babbb58edb1c8e14d7106e83bb');
      expect(elementArray[1].length).to.equal(3);
      expect(typeof elementArray[2]).to.equal('function');
      expect(elementArray[3].length).to.equal(3);
  
    });
  });
  
  describe("getConfig()", function() {
    it("should return an object with 2 teams for the eaglesTest", function(){
      var scraper;
      scraper = new Scraper(eaglesTest);
      expect(typeof scraper.getConfig()).to.be.equal('object');
      expect(Array.isArray(scraper.getConfig())).to.be.equal(true);
      expect(scraper.getConfig().length).to.be.equal(2);
    });
  });
  
  describe("setConfig()", function() {
    it("should set the eagles test as the config", function(){
      var scraper;
      scraper = new Scraper();
      scraper.setConfig(eaglesTest);
      expect(typeof scraper.getConfig()).to.be.equal('object');
    });
  });
  
  describe("scrape()", function() {
    context("eagles test roster", function(){
      var scrapper,
          data;
    
      scrapper= new Scraper(eaglesTest);
      
      data = scrapper.scrape();
      
      it("should return a Table",function(){
        expect(Table.isTable(data)).to.be.equal(true);
      });
      
      it("should return 10 columns",function(){
        expect(data.length).to.be.equal(10);
      });
      
      it("should return 68 number rows", function(){
        expect(data[0].length).to.be.equal(158);
      });
      
      it("should return 68 name rows", function(){
        expect(data[1].length).to.be.equal(158);
      });
      
      it("should return 68 position rows", function(){
        expect(data[2].length).to.be.equal(158);
      });
      
      it("should return 68 weight rows", function(){
        expect(data[3].length).to.be.equal(158);
      });
      
      it("should return 68 height rows", function(){
        expect(data[4].length).to.be.equal(158);
      });
      
      it("should return 68 age rows", function(){
        expect(data[5].length).to.be.equal(158);
      });
      
      it("should return 68 experience rows", function(){
        expect(data[6].length).to.be.equal(158);
      });
      
      it("should return 68 college rows", function(){
        expect(data[7].length).to.be.equal(158);
      });
      
      it("should return 68 squad rows", function(){
        expect(data[8].length).to.be.equal(158);
      });
      
      it("should return active for the first row in the squad col.", function(){
        expect(data[8][0].toString().toLowerCase()).to.be.equal("active");
      });
    });
  });
  
  describe("getHeadings()", function() {
    it("should return the headings for the Eagles test roster",function(){
      var scrapper,
          data;
      
        scrapper= new Scraper(eaglesTest);
        
        data = scrapper.getHeadings(0);
         
        expect(Array.isArray(data)).to.be.equal(true);
        expect(data.length).to.be.equal(10);
    });
  });

})
