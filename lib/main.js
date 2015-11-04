#!/usr/bin/env node

var http = require('http'),
    docopt = require('docopt').docopt,
    rosters = {};

var doc =
"Usage:\n\
  main.js [--roster ROSTER]\n\
  main.js -h | --help\n\
  main.js --version\n\
Options:\n\
  -h --help     Show this screen.\n\
  --roster ROSTER Name of the roster module you would like to scrape.\n  --version Show version."

var options = docopt(doc, {help: true, version: getVersion()});

function getVersion(){
  var pjson = require('../package.json');
  return pjson.version
};

console.log(options);

/*
http.get("url", function(res) {
  console.log("Got response: " + res.statusCode);
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});
*/
