'use strict';

var expect = require("chai").expect;
var sys = require('util');
var exec = require('child_process').exec;

function expectStdoutToEqual(callback, expected){
    return function(error, stdout, stderr){
        expect(stdout).to.equal(expected);
        expect(error).to.not.equal(null);
        expect(stderr).to.not.equal(null);
        callback();
    }
};

function expectStdoutToContain(callback, expected){
    return function(error, stdout, stderr){
        expect(stdout).to.contain(expected);
        expect(error).to.not.equal(null);
        expect(stderr).to.not.equal(null);
        callback();
    }
};

describe("ndoe main.js --roster NFL --output json", function() {
    it("should return a json object", function(done){
        var text = "Loading roster module";
        var configPath = __dirname + '/../../rosters/NFL.js';
        exec("node main.js --config " + configPath + " --format JSON", expectStdoutToContain(done, text));
    });
});
