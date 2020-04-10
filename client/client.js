const xmlrpc = require('xmlrpc');
const { toXML } = require('jstoxml');

const XML_RPC_SERVER_PORT = process.env.XML_RPC_SERVER_PORT || 9090;

const client = xmlrpc.createClient({ host: 'localhost', port: XML_RPC_SERVER_PORT, path: '/'});

module.exports = {
    add: (params, callback) => {client.methodCall('add', params, callback)},
    subtract: (params, callback) => {client.methodCall('subtract', params, callback)},
    divide: (params, callback) => {client.methodCall('divide', params, callback)},
    multiply: (params, callback) => {client.methodCall('multiply', params, callback)},
    chatter: (params, callback) => {client.methodCall('repeat', params, callback)},
    ping: (params, callback) => {client.methodCall('ping', params, callback)},
    localPing: function(data){
        return data;
    }
};