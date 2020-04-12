const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const after = require('mocha').after;
const faker = require('faker');

const {SimpleXmlRpcClient} = require('../lib/client');
const PORT = process.env.XML_RPC_SERVER_PORT || 9090;
const HOST = 'localhost';
const PATH = '/';

const client = new SimpleXmlRpcClient(HOST, PORT, PATH);

let app = null;

const ARRAY_LENGTH = 10;
const getRandomArray = () =>{
    return Array.from({length: ARRAY_LENGTH}, () => Math.floor(Math.random() * ARRAY_LENGTH));
};

describe('Basic client class Tests: ', () => {

    before(function () {
        const {server} = require('../../server/server');
        app = server;
    });

    after(function () {
        app.httpServer.close();
        console.log({message: `xml-grpc server shutdown at ${new Date()}`})
    });

    it('Can POST add', function (done) {
        const numbers = getRandomArray();

        const callback = (err, result) => {
            expect(result).to.be.an('object');
            expect(result.responseXml).to.be.a('string');
            expect(result.requestXml).to.be.a('string');
            expect(result.data).to.be.a('number');
            done();
        };
        client.add({numbers, verbose:true}, callback);
    });

    it('Can POST subtract', function (done) {
        const numbers = getRandomArray();

        const callback = (err, result) => {
            expect(result).to.be.an('object');
            expect(result.responseXml).to.be.a('string');
            expect(result.requestXml).to.be.a('string');
            expect(result.data).to.be.a('number');
            done();
        };
        client.subtract({numbers, verbose:true}, callback);
    });

    it('Can POST divide', function (done) {
        const numbers = [2,4];

        const callback = (err, result) => {
            expect(result).to.be.an('object');
            expect(result.responseXml).to.be.a('string');
            expect(result.requestXml).to.be.a('string');
            expect(result.data).to.be.a('number');
            done();
        };
        client.divide({numbers, verbose:true}, callback);
    });
    it('Can POST multiply', function (done) {
        const numbers = getRandomArray();

        const callback = (err, result) => {
            expect(result).to.be.an('object');
            expect(result.responseXml).to.be.a('string');
            expect(result.requestXml).to.be.a('string');
            expect(result.data).to.be.a('number');
            done();
        };
        client.multiply({numbers, verbose:true}, callback);
    });
    it('Can POST ping', function (done) {
        const message = faker.lorem.words(3);

        const callback = (err, result) => {
            expect(result).to.be.an('object');
            expect(result.responseXml).to.be.a('string');
            expect(result.requestXml).to.be.a('string');
            expect(result.data).to.be.a('string');
            done();
        };
        client.ping({message, verbose:true}, callback);
    });

    it('Can POST chatter', function (done) {
        const message = faker.lorem.word(2);
        const limit = Math.floor((Math.random() * 100) + 1);;

        const callback = (err, result) => {
            expect(result).to.be.an('object');
            expect(result.responseXml).to.be.a('string');
            expect(result.requestXml).to.be.a('string');
            expect(result.data).to.be.an('array');
            done();
        };
        client.chatter({message, limit, verbose:true}, callback);
    });
});