'use strict';

var expect = require("chai").expect,
  Data = require(__dirname + "/../lib/Data.js");

describe("Data", function() {

  describe("#arrayAllEqual()", function() {
    it("should return true when all array elements are numbers and equal to one another", function() {
      var actual = Data.arrayAllEqual([12, 12, 12, 12])
      expect(actual).to.equal(true);
    });

    it("should return true when all array elements are strings and equal to one another", function() {
      var actual = Data.arrayAllEqual(["foo", "foo", "foo", "foo"])
      expect(actual).to.equal(true);
    });

    it("should return true when all array elements are nulls and equal to one another", function() {
      var actual = Data.arrayAllEqual([null, null, null, null])
      expect(actual).to.equal(true);
    });

    it("should return true when the array only contains 1 element", function() {
      var actual = Data.arrayAllEqual([12])
      expect(actual).to.equal(true);
    });

    it("should return false when the array only contains no elements", function() {
      var actual = Data.arrayAllEqual([])
      expect(actual).to.equal(false);
    });

  });

  describe("#getMaxOfArray()", function() {
    it("should return the maximum number in the array", function() {
      var actual = Data.getMaxOfArray([1, 3, 50, 7, 9]);
      expect(actual).to.equal(50);
    })
  });

  describe("#normalize2dArrayLength()", function() {
    it("should return a 2d array where sub arrays are equal length", function() {
      var normalized2dArray = Data.normalize2dArrayLength([
        [1, 2],
        [1],
        [2, 3, 4]
      ], null);

      var expectedLenth = 3;

      expect(normalized2dArray[0].length).to.equal(expectedLenth);
      expect(normalized2dArray[1].length).to.equal(expectedLenth);
      expect(normalized2dArray[2].length).to.equal(expectedLenth);
    });
  });

  describe("#normalize2dArrayLength()", function() {
    it("should return original object when it comes across an item that is not an array.", function() {
      var normalized2dArray = Data.normalize2dArrayLength([
        [1, 2],
        function() {},
        [2, 3, 4]
      ], null);

      var expectedLenth = 3;

      expect(normalized2dArray[0].length).to.equal(expectedLenth);
      expect(typeof normalized2dArray[1]).to.equal('function');
      expect(normalized2dArray[2].length).to.equal(expectedLenth);
    });
  });

  describe("#map2dArrayLengths()", function() {
    it("should return an array of lengths from a 2d array", function() {
      var originalArray = [
        [1, 2, 3, 4, 5, 6],
        [4, 5],
        [7, 8, 9, 10]
      ];
      
      var actual = originalArray.map(Data.map2dArrayLengths);

      expect(actual[0]).to.equal(6);
      expect(actual[1]).to.equal(2);
      expect(actual[2]).to.equal(4);
    });
  });
  
  describe("#getRowCount()", function() {
    
    context("mixed 2d array with arrays and functions", function(){
      var originalArray = [
            function(){},
            [1, 2, 3, 4, 5, 6],
            function(){},
            [7, 8, 9, 10],
            [7,32]
          ],
          normalized2dArray = Data.normalize2dArrayLength(originalArray);
          
      it("should return a count of 6 with no offset", function() {
        var rowCount = Data.getRowCount(normalized2dArray);
        expect(rowCount).to.equal(6);
      });
      
      it("should return a count of 6 with an offset set to an array column", function() {
        var rowCount = Data.getRowCount(normalized2dArray, 2);
        expect(rowCount).to.equal(6);
      });
      
      it("should return a count of 6 with an offset set to a function column", function() {
        var rowCount = Data.getRowCount(normalized2dArray, 2);
        expect(rowCount).to.equal(6);
      });
      
    });
    
    context("a 2d array with empty rows", function(){
       var originalArray = [[],[],[]],
          normalized2dArray = Data.normalize2dArrayLength(originalArray);
          
      it("should return 0 rows", function() {
        var rowCount = Data.getRowCount(normalized2dArray);
        expect(rowCount).to.equal(0);
      });
      
    });
    
    context("all error conditions", function(){
      it("should throw an error", function() {
        var invalidObject = Data.getRowCount.bind(null,{}),
            invalidArray1 = Data.getRowCount.bind(null,[]),
            invalidArray2 = Data.getRowCount.bind(null,[{}, {}]),
            invalidArray3 = Data.getRowCount.bind(null,[function(){}]),
            invalidFunction = Data.getRowCount.bind(null,function(){});
            
        expect(invalidObject).to.throw(Error);
        expect(invalidArray1).to.throw(Error);
        expect(invalidArray2).to.throw(Error);
        expect(invalidArray3).to.throw(Error);
        expect(invalidFunction).to.throw(Error);
      });
    });
    
  });

});