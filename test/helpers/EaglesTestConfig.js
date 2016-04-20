'use strict';

const fs = require('fs');
const Dom = require(__dirname + "/../../lib/Dom");

module.exports =  [
    {
        "uri": "",
        "document": fs.readFileSync(__dirname + "/../assets/nfl_eagles.html").toString(),
        "dataSelector" : {
          "number" : "table tbody tr td.col-jersey",
          "name" : "table tbody tr td.col-name a span",
          "position" : "table tbody tr td.col-position",
          "weight" : "table tbody tr td.col-weight",
          "height" : "table tbody tr td.col-height",
          "age" : "table tbody tr td.col-bd",
          "experience" : "table tbody tr td.col-exp",
          "college" : "table tbody tr td.col-college",
          "squad" : function($, currentRowIndex, fullElementArray) {
            var rows = $("table tbody tr"),
                currentRow = rows.eq(currentRowIndex),//:eq(" + currentRowIndex + ")",
                table = $(currentRow).closest('table'),
                squadHeader = $(table).prevAll('.mod-title-nobackground').find('h2'),
                squad = Dom.getTextNodesIn(squadHeader).text();
            
            return  squad;
          }
        }
      }
    
  ]