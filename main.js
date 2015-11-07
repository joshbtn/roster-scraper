#!/usr/bin/env node

var 
    http = require('http'),
    docopt = require('docopt').docopt,
    scraper = require('lib/scraper'),
    rosters = {};

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
  var pjson = require('../package.json');
  return pjson.version
};


var currentTeamIndex;
var currentTeam;
var scraper = Scrape(options["--roster"]);


