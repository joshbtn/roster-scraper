#!/usr/bin/env node

var 
    docopt = require('docopt').docopt,
    ScrapeService = require( __dirname + '/lib/ScrapeService.js');

var doc =
"Usage:\n\
  main.js --roster ROSTER\n\
  main.js -h | --help\n\
  main.js --version\n\
Options:\n\
  -h --help        Show this screen.\n\
  --roster ROSTER  Name of the roster module you would like to scrape.\n\
  --version        Get version information";

var options = docopt(doc, {help: true, version: getVersion()});

function getVersion(){
  var pjson = require('./package.json');
  return pjson.version
};

var rosterName = options["--roster"].toString();
var scrapeService = new ScrapeService(rosterName, null);
scrapeService.load();

scrapeService.on('load', function(){
  console.log( scrapeService.scrape().getData() );
})


