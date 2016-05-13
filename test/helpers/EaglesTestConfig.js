'use strict';

const fs = require('fs');
const Dom = require(__dirname + "/../../lib/Dom");

module.exports = [{
    "name": "Eagles",
    "document": fs.readFileSync(__dirname + "/../assets/nfl_eagles.html").toString(),
    "dataSelector": {
      "team": function(){return "Eagles"},
      "number": "table tbody tr td.col-jersey",
      "name": "table tbody tr td.col-name a span",
      "position": "table tbody tr td.col-position",
      "weight": "table tbody tr td.col-weight",
      "height": "table tbody tr td.col-height",
      "age": "table tbody tr td.col-bd",
      "experience": "table tbody tr td.col-exp",
      "college": "table tbody tr td.col-college",
      "squad": function($, currentRowIndex, fullElementArray) {
        var getTextNodesIn = function(el) {
          return el.find(":not(iframe)").addBack().contents().filter(function() {
            return this.nodeType == 3;
          });
        };
        var rows = $("table tbody tr"),
          currentRow = rows.eq(currentRowIndex), //:eq(" + currentRowIndex + ")",
          table = $(currentRow).closest('table'),
          squadHeader = $(table).prevAll('.mod-title-nobackground').find('h2'),
          squad = getTextNodesIn(squadHeader).text();

        return squad;
      }

    }
  },
  
  {
    "name": "Ravens",
    "document": fs.readFileSync(__dirname + "/../assets/nfl_ravens.html").toString(),
    "dataSelector": {
      
      "team": function(){return "Ravens"},
      "number": "table tbody tr td.col-jersey",
      "name": "table tbody tr td.col-name a span",//One of these may be broken, which needs a test case.
      "position": "table tbody tr td.col-position",
      "weight": "table tbody tr td.col-weight",
      "height": "table tbody tr td.col-height",
      "age": "table tbody tr td.col-bd",
      "experience": "table tbody tr td.col-exp",
      "college": "table tbody tr td.col-college",
      "squad": function($, currentRowIndex, fullElementArray) {
        var getTextNodesIn = function(el) {
          return el.find(":not(iframe)").addBack().contents().filter(function() {
            return this.nodeType == 3;
          });
        };
        var rows = $("table tbody tr"),
          currentRow = rows.eq(currentRowIndex), //:eq(" + currentRowIndex + ")",
          table = $(currentRow).closest('table'),
          squadHeader = $(table).prevAll('.mod-title-nobackground').find('h2'),
          squad = getTextNodesIn(squadHeader).text();

        return squad;
      }

    }
  }

]