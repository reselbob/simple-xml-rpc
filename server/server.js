const xmlrpc = require('xmlrpc');

const XML_RPC_SERVER_PORT = process.env.XML_RPC_SERVER_PORT || 9090;

const operation = {
    add:'add',
    subtract: 'subtract',
    multiply: 'multiply',
    divide: 'divide',
    ping: 'ping',
    chatter: 'chatter'
}

// Creates an XML-RPC server to listen to XML-RPC method calls
const server = xmlrpc.createServer({ host: 'localhost', port: XML_RPC_SERVER_PORT });
// Handle methods not found
server.on('NotFound', function(method, params) {
    console.log('Method ' + method + ' does not exist');
});

// Handle method calls by listening for events with the method call name
server.on(operation.add, function (err, params, callback) {
    const input = params.length === 1 ? params[0] : params;
    const result = input.reduce((a, b) => a + b, 0);
    callback(null, result)
});

server.on(operation.subtract, function (err, params, callback) {
    const input = params.length === 1 ? params[0] : params;
    const result = input.reduce((a, b) => a - b);
    callback(null, result)
});

server.on(operation.multiply, function (err, params, callback) {
    const input = params.length === 1 ? params[0] : params;
    const result = input.reduce((a, b) => a * b, 1);
    callback(null, result)
});

server.on(operation.divide, function (err, params, callback) {
    const input = params.length === 1 ? params[0] : params;
    const result = input.reduce((a, b) => a / b);
    callback(null, result)
});

server.on(operation.ping, function (err, params, callback) {
    const input = params;
    const result = JSON.stringify(input);
    callback(null, result)
});

server.on(operation.chatter, function (err, params, callback) {
    const arr = [];
    for( let i = 0;i< params[0].limit; i++){arr.push({message: params[0].message, count: i})};
    callback(null, arr)
});

console.log('XML-RPC server listening on port ' + XML_RPC_SERVER_PORT + ' at ' + new Date());

module.exports = {server, operation};