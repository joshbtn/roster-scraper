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

describe("Data.normalize2dArrayLength", function(){
  it("should return a 2d array where sub arrays are equal length", function(){
    var normalized2dArray = Data.normalize2dArrayLength([[1,2],[1],[2,3,4]], null);
    
    var expectedLenth = 3;
    
    expect(normalized2dArray[0].length).to.equal(expectedLenth);
    expect(normalized2dArray[1].length).to.equal(expectedLenth);
    expect(normalized2dArray[2].length).to.equal(expectedLenth);
  });
});

describe("Data.map2dArrayLengths", function() {
   it("should return an array of lengths from a 2d array", function(){
     var originalArray  = [[1,2,3,4,5,6],[4,5],[7,8,9,10]];
     var actual = originalArray.map(Data.map2dArrayLengths);

     expect(actual[0]).to.equal(6);
     expect(actual[1]).to.equal(2);
     expect(actual[2]).to.equal(4);
   }) ;
});