'use strict';

const expect = require("chai").expect;
const Dom = require(__dirname + "/../lib/Dom");
const fs = require('fs');
const ScrapeService = require(__dirname + '/../lib/ScrapeService');
const OutputCsv = require(__dirname + '/../lib/OutputCsv');
let eaglesTest = require(__dirname + "/helpers/EaglesTestConfig");

describe("ScraperService", function() {
  
  describe("scrape()", function() {
      context("with no output", function(){
        
        var noOutput = null;
        var scrapeService = new ScrapeService(eaglesTest);
        
        it("Should return expected data array for the nfl eagles test", function(){
          var scraper = scrapeService.scrape();
        
          var data = scraper.getData();
          
          expect(data.length).to.be.equal(9);
          expect(data[0]).to.not.equal(undefined);
          expect(data[0].length).to.be.above(10);
        })
      });
  })
  
  describe("load()", function() {
      context("with no output", function(){
        
        var noOutput = null;
        var rosterConfigPath = __dirname + '/../rosters/NFL.js';
        var scrapeService = new ScrapeService(rosterConfigPath, noOutput);
        
        it("Should return expected data array for the nfl eagles test", function(next){
          scrapeService.load();
          
          scrapeService.on('load', function(){
            var scraper = scrapeService.scrape();
            var data = scraper.getData();
            
            expect(data.length).to.be.equal(10);
            expect(data[0]).to.not.equal(undefined);
            expect(data[0].length).to.be.above(10);
            next();
          })
          
        })
      });
  })
  
});