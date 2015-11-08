function BaseScraper(){
    var self = this,
        data = [];

    this.setData = function(){
        return data;
    }

    this.getData = function(){
        return data;
    }
    
    this.scrape = function(){
        throw new Error("not implimented yet.");
    }
}

module.exports = BaseScraper;