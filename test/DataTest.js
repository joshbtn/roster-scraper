'use strict';

var expect = require("chai").expect,
    fs = require('fs'),
    Data = require(__dirname + "/../lib/util/Data.js");

describe("Data.arrayAllEqual", function() {
  
  it("should return true when all array elements are numbers and equal to one another", function(){
    var actual = Data.arrayAllEqual([12,12,12,12])
    expect(actual).to.equal(true);
  });
 
  it("should return true when all array elements are strings and equal to one another", function(){
    var actual = Data.arrayAllEqual(["foo","foo","foo","foo"])
    expect(actual).to.equal(true);
  });
  
  it("should return true when all array elements are nulls and equal to one another", function(){
    var actual = Data.arrayAllEqual([null,null,null,null])
    expect(actual).to.equal(true);
  });
  
  it("should return true when the array only contains 1 element", function(){
    var actual = Data.arrayAllEqual([12])
    expect(actual).to.equal(true);
  });
  
  it("should return false when the array only contains no elements", function(){
    var actual = Data.arrayAllEqual([])
    expect(actual).to.equal(false);
  });
  
});

describe("Data.getMaxOfArray", function() {
  it("should return the maximum number in the array", function(){
    var actual = Data.getMaxOfArray([1,3,50,7,9]);
    expect(actual).to.equal(50);
  })
});