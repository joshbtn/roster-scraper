'use strict';

function Data(){
    
}

var map2dArrayLengths = Data.map2dArrayLengths = function(currentValue, currentIndex, array){
    return currentValue.length;
}

var arrayAllEqual = Data.arrayAllEqual = function(array){
    if(array.length === 0){
        return false;
    }
    
    var allEqual = true,
        index = 1,
        previous, current;
    
    for(;index < array.length; index += 1){
        previous = array[index - 1];
        current = array[index];
        allEqual = allEqual && (current === previous);
    }
    
    return allEqual;
}

var getMaxOfArray = Data.getMaxOfArray = function(numArray) {
  return Math.max.apply(null, numArray);
}

Data.normalize2dArrayLength = Data.prototype.normalize2dArrayLength = function(array, emptyDataObject){
    var arrayLenghts = array.map(map2dArrayLengths),
        maxArrayLength = getMaxOfArray(arrayLenghts);
    
    //No need to normalize array lengths if all lengths are equal.
    if(arrayAllEqual(arrayLenghts)){
        return array;
    }
    
    //TODO normalize lengths
}

module.exports = Data;