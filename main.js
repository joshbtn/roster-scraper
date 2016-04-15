#!/usr/bin/env node

var 
    docopt = require('docopt').docopt,
    ScrapeService = require( __dirname + '/lib/ScrapeService.js');

var doc =
"Usage:\n\
  main.js --config CONFIG --format FORMAT [--path PATH]\n\
  main.js -h | --help\n\
  main.js --version\n\
Options:\n\
  -h --help        Show this screen.\n\
  -c --config CONFIG  Path of the roster module you would like to scrape.\n\
  -f --format FORMAT  'csv' or 'json'.\n\
  -p --path   PATH    Path for output\n\
  -v --version        Get version information";

var options = docopt(doc, {help: true, version: getVersion()});

function getVersion(){
  var pjson = require('./package.json');
  return pjson.version
};

var config = options["--config"].toString();
var format = options["--format"].toString();
var path = options["--path"].toString();


var output = null;
var scrapeService = new ScrapeService(config);

var initOutput = {
  "csv": function(){
    output = new OutputCsv(scrapeService.getScraper())
  }
}

initOutput[format]();

scrapeService.load();

scrapeService.on('load', function(){
  console.log( scrapeService.scrape().getData() );
})


