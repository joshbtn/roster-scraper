'use strict';
const crypto = require('crypto');

const secret = '';

var nfl = [{
        "uri": "http://www.philadelphiaeagles.com/team/roster.html",
        "document": "",
        "dataSelector": {
          "id": function($, currentRowIndex, fullElementArray) {
          
            var getTextNodesIn = function(el) {
              return el.find(":not(iframe)").addBack().contents().filter(function() {
                return this.nodeType == 3;
              });
            };

            var rows = $("table tbody tr"),
              currentRow = rows.eq(currentRowIndex), //:eq(" + currentRowIndex + ")",
              name = getTextNodesIn($(currentRow).find("td.col-name a span")).text(),
              position = getTextNodesIn($(currentRow).find("td.col-position")).text(),
              first = name.split(',')[1].trim(),
              last = name.split(',')[0].trim(),
              to_hash = position + first + last;

            const hash = crypto.createHmac('sha1', secret)
                   .update(to_hash)
                   .digest('hex');

            return hash;
          },
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
      }
    
  ]

module.exports = nfl;