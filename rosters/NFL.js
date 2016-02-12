'use strict';

var nfl = {
  "team": [
    {
      "name": "Eagles",
      "uri": "http://www.philadelphiaeagles.com/",
      "roster": {
        "uri": "http://www.philadelphiaeagles.com/team/roster.html",
        "document": "",
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
            var getTextNodesIn = function(el) {
                return el.find(":not(iframe)").addBack().contents().filter(function() {
                    return this.nodeType == 3;
                });
            };
            var rows = $("table tbody tr"),
                currentRow = rows.eq(currentRowIndex),//:eq(" + currentRowIndex + ")",
                table = $(currentRow).closest('table'),
                squadHeader = $(table).prevAll('.mod-title-nobackground').find('h2'),
                squad = getTextNodesIn(squadHeader).text();
            
            return  squad;
          }

        }
      }
    }/*,
    {
      "name": "Seahawks",
      "uri": "http://www.seahawks.com/",
      "roster": {
        "uri": "http://www.seahawks.com/team/roster",
        "document": "",
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
            var currentRow = "table tbody tr:eq(" + currentRowIndex + ")",
                $squadHeader = $(currentRow).closest('h2');

            return  $squadHeader[0].innerHTML;
          }

        }
      }
    }*/
  ]
}

module.exports = nfl;
