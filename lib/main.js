#!/usr/bin/env node

var ROSTER_MODULE_LOCATION = "rosters/",
    http = require('http'),
    docopt = require('docopt').docopt,
    scraper = require('./scraper'),
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

function getRosterModule(rosterName){
  var modulePath = ROSTER_MODULE_LOCATION + rosterName + ".js";
  console.log("Loading roster module " + modulePath);
  return require(modulePath);
}

var roster = getRosterModule(options["--roster"]);
var currentTeamIndex;
var currentTeam;

for(currentTeamIndex = 0; currentTeamIndex < roster.team.length; currentTeamIndex+=1 ){
  currentTeam = roster.team[currentTeamIndex];

  console.log(currentTeam);

  /*
  http.get(currentTeam.roster.url, function(res) {
    console.log("Got response: " + res);
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
  */

}
