let {server, operation} = require("../server");
const xmlrpc = require('xmlrpc');
const { toXML } = require('jstoxml');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const after = require('mocha').after;
const faker = require('faker');
const {ChatterRequest} = require("../types/chatter-types");

const XML_RPC_SERVER_PORT = process.env.XML_RPC_SERVER_PORT || 9090;

const client = xmlrpc.createClient({ host: 'localhost', port: XML_RPC_SERVER_PORT, path: '/'});
const ARRAY_LENGTH = 4;

const getRandomArray = () =>{
    return Array.from({length: ARRAY_LENGTH}, () => Math.floor(Math.random() * ARRAY_LENGTH));
}

describe('Basic xml-rpc Tests: ', () => {
    after(function() {
        server.httpServer.close();
        console.log({message:  `xml-grpc server shutdown at ${new Date()}`})
    });

    it('Can ping', function (done) {
        const strs = [faker.lorem.words(3)];
        client.methodCall(operation.ping, strs, function (error, value) {
            const result  = JSON.parse(value);
            expect(strs[0]).to.equal(result[0]);
            done();
        })
    });

    it('Can add', function (done) {
        const arr = getRandomArray();
        const answer = arr.reduce((a, b) => a + b, 0);
        client.methodCall(operation.add, arr, function (error, value) {
            expect(value).to.equal(answer);
            done();
        })
    });

    it('Can subtract', function (done) {
        const arr = getRandomArray();
        const answer = arr.reduce((a, b) => a - b);
        client.methodCall(operation.subtract, arr, function (error, value) {
            expect(value).to.equal(answer);
            done();
        })
    });

    it('Can multiply', function (done) {
        const arr = getRandomArray();
        const answer = arr.reduce((a, b) => a * b, 1);
        client.methodCall(operation.multiply, arr, function (error, value) {
            expect(value).to.equal(answer);
            done();
        })
    });

    it('Can divide', function (done) {
        const arr = getRandomArray();
        const answer = arr.reduce((a, b) => a / b);
        client.methodCall(operation.divide, arr, function (error, value) {
            expect(value).to.equal(answer);
            done();
        })
    });

    it('Can chatter', function (done) {
        const message = faker.lorem.word(2);
        const limit = 2;
        const arr = [new ChatterRequest(message, limit)];
        client.methodCall(operation.chatter, arr, function (error, value) {
            expect(value.length).to.equal(limit);
            done();
        })
    });

});
