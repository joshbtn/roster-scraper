'use strict';
/* global context */
const expect = require("chai").expect;
const Table = require(__dirname + "/../lib/Table.js");

describe("Table", function() {
  
  describe("getRowCount()", function(){
    var table = new Table();
    table.push([1,3],[2,4],[3,6]);
    
    it('should return 2 rows', function(){
      var rowCount = table.getRowCount();
      
      expect(rowCount).to.be.equal(2)
      
    });
      
  });
  
  describe("isTable()", function(){
    var table = new Table();
    
    it('should return 2 rows', function(){
      expect(Table.isTable(table)).to.be.equal(true)
      
    });
      
  });
 
});