'use strict';

const expect = require("chai").expect;
const OutputCsv = require(__dirname + "/../lib/OutputCsv.js");
const Scraper = require(__dirname + "/../lib/Scraper.js");
let eaglesTest = require("./helpers/EaglesTestConfig")

describe("OutputCsv", function() {
  
  let scraper = new Scraper(eaglesTest);
  
  describe("#get()", function(){
      
      context("with a scraper set", function(){
      
        var outputCsv = new OutputCsv(scraper);
        
        it("should return data formated as csv.", function(){
          var actual = outputCsv.get();
          expect(actual.length).to.be.above(1);
        });
        
        
      })
      
  })
 
});