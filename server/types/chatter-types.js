const xmlrpc = require('xmlrpc');
const util = require('util');
const { toXML } = require('jstoxml');

class ChatterRequest {
    constructor(message, limit, tagName) {
        this.message = message;
        this.limit = limit;
        this.tagName = 'ChatterRequest';
    }
    serialize (){
        const doc = xmlDoc.createElement(this.tagName);
        const message = this.message;
        const limit = this.limit;
        var value = toXML({message, limit});
        return doc.ele(this.tagName).txt(value);
    }
}
/*
// create your custom class
const ChatterRequest = module.exports = (raw) => {
    this.raw = raw;
    //xmlrpc.CustomType.call(this, raw);
};
*/
// inherit everything
//util.inherits(ChatterRequest, xmlrpc.CustomType);

// set a custom tagName (defaults to 'customType')
//ChatterRequest.prototype.tagName = 'repeatRequest';

// optionally, override the serializer
ChatterRequest.prototype.serialize = function (xml) {

};

module.exports = {ChatterRequest};