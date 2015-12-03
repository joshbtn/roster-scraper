var expect = require("chai").expect,
    fs = require('fs'),
    Dom = require(__dirname + "/../lib/Dom.js");

describe("Dom.getDomWithJquery", function() {
  
  it("should return a window object with a reference to jquery using $", function(){
      var window = Dom.getDomWithJquery("<html><head></head><body></body></html>");
      expect(typeof window.$).to.equal('function');
  });
  
  it("should return a window object with a working $ selector method.", function(){
      var window = Dom.getDomWithJquery("<html><head></head><body><h1>test</h1></body></html>");
      var elementText = window.$('h1').text();
      expect(elementText).to.equal('test');
  });
  
});

