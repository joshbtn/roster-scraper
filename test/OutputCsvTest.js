'use strict';
/* global context */
const expect = require("chai").expect;
const OutputCsv = require(__dirname + "/../lib/OutputCsv.js");
const Scraper = require(__dirname + "/../lib/Scraper.js");
const Table = require(__dirname + "/../lib/Table.js");

describe("OutputCsv", function() {
  
  let scraper = new Scraper();
  
  describe("#get()", function(){
      
      context("basic set data test", function(){
        
        it('should return expected CsvString', function(){
          let table = new Table();
          table.push([1,4,7],[2,5,8],[3,6,9])
          scraper.setData(table);
          let outputCsv = new OutputCsv(scraper);
          let csvString = outputCsv.get();
        
          expect(csvString).to.be.equal("1,2,3\n4,5,6\n7,8,9");
        });
        
      });
      
  });
 
});