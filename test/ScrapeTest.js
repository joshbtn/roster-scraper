var expect = require("chai").expect,
    util = require('util'),
    fs = require('fs');

describe("Scrape", function() {
  
  var scrape = require('../lib/Scrape'),
      testLeague;
  
  beforeEach(function(){
    testLeague = {
      "team": [
        {
          "url": "",
          "name": "Eagles",
          "roster": {
            "uri": "",
            "document": fs.readFileSync(__dirname + '/assets/nfl_eagles.html').toString(),
            "dataSelector" : {
              "number" : "table tbody tr td.col-jersey",
              "name" : "table tbody tr td.col-name",
              "position" : "table tbody tr td.col-position",
              "weight" : "table tbody tr td.col-weight",
              "height" : "table tbody tr td.col-height",
              "age" : "table tbody tr td.col-bd",
              "experience" : "table tbody tr td.col-exp",
              "college" : "table tbody tr td.col-college",
              "squad" : function($, currentValue, index, fullArray) {
                var currentRow = "table tbody tr:eq(" + index + ")",
                    $squadHeader = $(currentRow).closest('h2');
    
                return  $squadHeader.text();
              }
            }
          }
        },
        {
          "url": "",
          "name": "Eagles",
          "roster": {
            "uri": "",
            "document": fs.readFileSync(__dirname + '/assets/nfl_seahawks.html').toString(),
            "dataSelector" : {
              "number" : "table tbody tr td.col-jersey",
              "name" : "table tbody tr td.col-name",
              "position" : "table tbody tr td.col-position",
              "weight" : "table tbody tr td.col-weight",
              "height" : "table tbody tr td.col-height",
              "age" : "table tbody tr td.col-bd",
              "experience" : "table tbody tr td.col-exp",
              "college" : "table tbody tr td.col-college",
              "squad" : function($, currentValue, index, fullArray) {
                var currentRow = "table tbody tr:eq(" + index + ")",
                    $squadHeader = $(currentRow).closest('h2');
    
                return  $squadHeader.text();
              }
            }
          }
        }
      ]
    }
  });
  
  afterEach(function(){
    testLeague = null;
  });
  
  //-------------------- Tests start here -------------------------
  
  it("should inherits", function(){
    var baseClass = function(){}
    var superClass = function(){}
    superClass.prototype.test = function(){};
    var n = util.inherits(baseClass, superClass);
    
    expect(n).to.not.equal(null)
  });
  
  it("should load the NFL roster config", function() {
    var nfl = scrape("NFL", {autoLoad: false});
    
    expect(nfl).to.not.equal(null);
    expect(nfl).to.not.equal(undefined);
  })
  
  it("should scrape test leauge and return a list of players greater than 1", function(){
    var scraper = scrape(testLeague, {autoLoad: false});
    
    scraper.scrape();
    
    //var players = scraper.getData(),
    //    playerCount = players.length;
    
    //expect(playerCount).to.be.above(1);
  });
  
});

