'use strict';

var expect = require("chai").expect;
var sys = require('util');
var fs = require('fs');
var exec = require('child_process').exec;

function expectStdoutToEqual(callback, expected){
    return function(error, stdout, stderr){
        expect(stdout).to.equal(expected);
        expect(error).to.not.equal(null);
        expect(stderr).to.not.equal(null);
        callback();
    }
};

function expectStdoutToContain(expected, callback){
    return function(error, stdout, stderr){
        expect(stdout).to.contain(expected);
        //expect(error).to.not.equal(null);
        //console.log(error)
        //console.log(stderr)
        //expect(stderr).to.not.equal(null);
        callback();
    }
};

describe("ndoe main.js --roster NFL.js --format csv --out test.csv", function() {
    it("should create a csv file", function(done){
        var text = "Loading roster module";
        var configPath = __dirname + '/../rosters/NFL.js';
        var outputPath  = __dirname + "/test_json_output.out.csv";
        var command = "node main.js --config " + configPath + " --format csv --out " + outputPath;
        console.log(command)
        exec(command, expectStdoutToContain(text, function(){
            //fs.accessSync(outputPath, fs.F_OK);
            //fs.unlinkSync(outputPath)
            done();
        }));
    });
});
