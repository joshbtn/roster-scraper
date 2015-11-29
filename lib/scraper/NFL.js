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
          "name" : "table tbody tr td.col-name",
          "position" : "table tbody tr td.col-position",
          "weight" : "table tbody tr td.col-weight",
          "height" : "table tbody tr td.col-height",
          "age" : "table tbody tr td.col-bd",
          "experience" : "table tbody tr td.col-exp",
          "college" : "table tbody tr td.col-college",
          "squad" : function(window, currentRowIndex, fullElementArray) {
            var $ = window.$,
                currentRow = "table tbody tr:eq(" + currentRowIndex + ")",
                $squadHeader = $(currentRow).closest('h2');

            return  $squadHeader[0].innerHTML;
          }

        }
      }
    }
  ]
}

module.exports = nfl;
