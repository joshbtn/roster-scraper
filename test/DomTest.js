var expect = require("chai").expect,
    fs = require('fs'),
    Dom = require(__dirname + "/../lib/Dom.js");

describe("Dom.getDom", function() {
  
  it("should return a window object with a reference to jquery using $", function(){
      var $ = Dom.getDom("<html><head></head><body></body></html>");
      expect(typeof $).to.equal('function');
  });
  
  it("should return a window object with a working $ selector method.", function(){
      var $ = Dom.getDom("<html><head></head><body><h1>test</h1></body></html>");
      var elementText = $('h1').text();
      expect(elementText).to.equal('test');
  });
  
});

