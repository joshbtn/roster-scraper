'use strict';

const ValidateScraper = require(__dirname + '/../lib/ValidateScraper');
const expect = require('chai').expect;

describe("ValidateScraper", function(){
   var validateScraper = new ValidateScraper(); 
   
   
   it("should be true", function(){
       expect(true).to.be.equal(true);
   })
});