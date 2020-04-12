const http = require('http');
const {XmlHelper} = require('./xmlHelper');
const {SimpleXmlRpcParser} = require('./parser');

const operation = {
    add:'add',
    subtract: 'subtract',
    multiply: 'multiply',
    divide: 'divide',
    ping: 'ping',
    chatter: 'chatter'
};

const getRequestOptions = (host, port, path) => {
    return {
        method: 'POST',
        url: host,
        path: path,
        port: port,
        headers: {
            'User-Agent': 'request',
            'Content-Type': 'text/xml'
        }
    }
};

const addContentLengthToOptions = (options, length) =>{
    options.headers["Content-Length"] = length;
    return options;
};

class Poster {
    constructor(host, port, path) {
        this.http = http;
        this.options = getRequestOptions(host, port, path);
        this.parser = new SimpleXmlRpcParser();
    }

    post(config, callback){
        const that = this;
        const options = addContentLengthToOptions(this.options, config.requestXml.length);
        const req = http.request( options, (res) =>  {
            let buffer = "";

            res.on( 'data', function( data ) {
                buffer = buffer + data;
            } );

            res.on('error', function(err) {
                callback(err, null);
            });

            res.on( 'end', function( data ) {
                const  result = {};
                switch (config.operation) {
                    case 'mathOp':{
                        result.data = that.parser.parseMathOperation(buffer);
                        break;
                    }
                    case 'ping':{
                        result.data = that.parser.parsePing(buffer);
                        break;
                    }
                    case 'chatter':{
                        result.data = that.parser.parseChatter(buffer);
                        break;
                    }
                }
                if(config.verbose){
                    result.requestXml = config.requestXml;
                    result.responseXml = buffer;
                }
                callback(null, result);
            });
        });

        req.on('error', function(err) {
            callback(err, null);
        });
        req.write( config.requestXml );
        req.end();
    }
}

class SimpleXmlRpcClient {
    constructor(serverHost, serverPort, serverPath) {
        this.xmlHelper = new XmlHelper();
        this.poster = new Poster(serverHost, serverPort, serverPath);
    }

    add({numbers,verbose}, callback) {
       const requestXml = this.xmlHelper.getMathOperationXml(operation.add, numbers);
       this.poster.post({requestXml, verbose, operation: 'mathOp'}, callback);
    }

    subtract({numbers,verbose}, callback){
        const requestXml = this.xmlHelper.getMathOperationXml(operation.subtract, numbers);
        this.poster.post({requestXml, verbose, operation: 'mathOp'}, callback);
    }
    divide({numbers,verbose}, callback){
        const requestXml = this.xmlHelper.getMathOperationXml(operation.divide, numbers);
        this.poster.post({requestXml, verbose, operation: 'mathOp'}, callback);
    }
    multiply({numbers,verbose}, callback){
        const requestXml = this.xmlHelper.getMathOperationXml(operation.multiply, numbers);
        this.poster.post({requestXml, verbose, operation: 'mathOp'}, callback);
    }

    chatter({message, limit, verbose}, callback){
        const requestXml = this.xmlHelper.getChatterXml(message,limit)
        this.poster.post({requestXml, verbose, operation: 'chatter'}, callback);
    }
    ping({message, verbose}, callback){
        const requestXml = this.xmlHelper.getPingRequestXml(message);
        this.poster.post({requestXml, verbose, operation: 'ping'}, callback);
    }
}
module.exports = {SimpleXmlRpcClient};