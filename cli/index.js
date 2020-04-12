#!/usr/bin/env node
const SERVER_HOST = process.env.SIMPLE_XML_RPC_HOST || 'localhost';
const SERVER_PORT = process.env.SIMPLE_XML_RPC_PORT || 9090;
const SERVER_PATH = process.env.SIMPLE_XML_RPC_PATH || '/';
const {SimpleXmlRpcClient} = require('./lib/client');


var argv = require('yargs')
    .usage('Usage: $0 -o [string] - d [array] -m [string] -c 100 [num')
    .example('$0 -o add -d [4,5.5,6]', 'Sums up the numbers in the array [4, 5.5, 6]')
    .example('$0 -o chatter -m I have a secret -c 100', 'returns the messages, "I have a secret" in a stream of 100 messages')
    .alias('o', 'operation')
    .alias('d', 'data')
    .alias('m', 'message')
    .alias('c', 'count')
    .alias('h', 'host')
    .alias('p', 'port')
    .alias('v', 'verbose')
    .default('h', SERVER_HOST)
    .default('p', SERVER_PORT)
    .describe('o', 'The operation to perform. Choose from the operations: add, subtract, multiply, divide, chatter, ping')
    .describe('d', 'The array of numbers to process. Used with the operations, add, subtract, multiply, divide')
    .describe('m', 'Used with the operation, chatter and ping. The message to transit.')
    .describe('c', 'Used with the operation, chatter. Indicates the number of messages to return in the stream.')
    .describe('h', 'The xml-rpc server host.')
    .describe('p', 'The xml-rpc server port.')
    .describe('v', 'Verbose response including requestXML and responseXML')
    .demandOption(['o'])
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2020')
    .argv;

const client = new SimpleXmlRpcClient(SERVER_HOST, SERVER_PORT, SERVER_PATH);

const mathCallback = (err, response) => {
    console.log(JSON.stringify(response))
};

const chatterCallback = (err, response) => {
    console.log(response)
};

const argMathError = (op) => {
    console.error(`ERROR: Invalid array provided for operation, ${op}`);
};
const argChatterError = (arr) => {
    console.error(`ERROR: Invalid parameters provided for operation, Chatter, Invalid parameters, ${JSON.stringify(arr)}`);
};

const opError = () => {
    console.error(`ERROR: Missing operation. Please declare one of the following operations: add, subtract, divide, multiply, chatter, ping`);
};

const validateArray = (data) => {
    let arr;
    try {
        arr = JSON.parse(data)
    } catch (e) {
        if (!e instanceof SyntaxError) {
            throw e
        }
    }
    if (Array.isArray(arr)) return arr;
}

const add = (config) => {
    const arr = validateArray(config.numbers);
    if (!Array.isArray(arr)) {argMathError('add');return;}
    client.add({numbers:arr, verbose: config.verbose }, mathCallback);
};

const subtract = (config) => {
    const arr = validateArray(config.numbers);
    if (!Array.isArray(arr)) {argMathError('subtract');return;}
    client.subtract({numbers:arr, verbose: config.verbose }, mathCallback);
};

const divide = (config) => {
    const arr = validateArray(config.numbers);
    if (!Array.isArray(arr)) {argMathError('divide');return;}
    client.divide({numbers:arr, verbose: config.verbose }, mathCallback);
};

const multiply = (config) => {
    const arr = validateArray(config.numbers);
    if (!Array.isArray(arr)){argMathError('multiply');return;}
    const numbers = arr;
    client.multiply({numbers:arr, verbose: config.verbose}, mathCallback);
};

const chatter = (config) => {
    const arr = [];
    if (typeof config.message !== 'string') arr.push('message');
    if (typeof config.count !== 'number') arr.push('count');
    if (arr.length > 0) {argChatterError(arr); return;}
    const message  =  config.message;
    const count  =  config.count;
    const verbose = config.verbose;
    client.chatter({message, count, verbose}, chatterCallback);
};

const ping = (config) => {
    const callback = (err, response) => {
        response.date = new Date();
        console.log(JSON.stringify(response))
    }
    const message  =  config.message;
    const verbose = config.verbose;
    client.ping({message,verbose}, callback)
};

if (typeof argv.o !== 'string') {
    opError();
    return
}

switch (argv.o.toLowerCase()) {
    case('add'):
        add({numbers: argv.d, verbose: argv.v} );
        break;
    case('subtract'):
        subtract({numbers: argv.d, verbose: argv.v} );
        break;
    case('multiply'):
        multiply({numbers: argv.d, verbose: argv.v} );
        break;
    case('divide'):
        divide({numbers: argv.d, verbose: argv.v} );
        break;
    case('chatter'):
        chatter({message: argv.m, count: argv.c, verbose: argv.v});
        break;
    case('ping'):
        ping({message: argv.m, count: argv.c, verbose: argv.v});
        break;
    default:
        console.log(argv.o + ' is an unknown operation')
}
