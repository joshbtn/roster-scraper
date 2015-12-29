'use sctrict';

var Data = require('./Data');
var util = require('util');

function Table(arg){
    
    Array.call(this, arg)
}

util.inherits(Table, Array);

Table.prototype.rowCount = function(){
    
}

Table.isTable = function(table){
    return table instanceof Table;
}

Table.prototype.concat = function(table){
    var results;
    
    if(Table.isTable(table)){
        results = Table.super_.prototype.concat.apply(this, table.slice());
    }
    
    results = Table.super_.prototype.concat.call(this, arguments);
    
    return new Table(results.slice(0,0));
    
}

module.exports = Table;