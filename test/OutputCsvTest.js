'use strict';
/* global context */
const expect = require("chai").expect;
const OutputCsv = require(__dirname + "/../lib/OutputCsv.js");
const Scraper = require(__dirname + "/../lib/Scraper.js");

describe("OutputCsv", function() {
  
  let scraper = new Scraper();
  
  describe("#get()", function(){
      
      context("basic set data test", function(){
      
        it('should return "1,2,3\\n4,5,6"', function(){
          scraper.setData([[1,4],[2,5],[3,6]]);
          let outputCsv = new OutputCsv(scraper);
          let csvString = outputCsv.get();
        
          expect(csvString).to.be.equal("1,2,3\\n4,5,6");
        });
        
      });
      
  });
 
});