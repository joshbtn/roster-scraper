'use sctrict';

var Data = require('./Data');
var util = require('util');

function Table(len){
    if(typeof len === 'number'){
        Array.call(this, len);
    }
    
    Array.call(this)
}

util.inherits(Table, Array);

Table.prototype.getRowCount = function(){
    return Data.getRowCount(this);
}

Table.isTable = function(table){
    return table instanceof Table;
}

module.exports = Table;