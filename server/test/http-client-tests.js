const { toXML } = require('jstoxml');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const after = require('mocha').after;
const faker = require('faker');
var request = require('request');
let app;
const http = require('http');
const convert = require('xml-js');
const DOMParser = require('xmldom').DOMParser;
const XMLSerializer = require('xmldom').XMLSerializer;

const XML_RPC_SERVER_PORT = process.env.XML_RPC_SERVER_PORT || 9090;

const ARRAY_LENGTH = 3;

const getRandomArray = () =>{
    return Array.from({length: ARRAY_LENGTH}, () => Math.floor(Math.random() * ARRAY_LENGTH));
}

const getPingXml = (input ) =>{
const str = `<?xml version="1.0"?>` +
    `<methodCall>` +
    `<methodName>ping</methodName>` +
    `<params>` +
    `<param>` +
    `<value><string>${input}</string></value>` +
    `</param>` +
    `</params>` +
    `</methodCall>`;
    return str;
};

const getChatterXml = (message, limit) => {
    const str = `<?xml version="1.0"?>` +
        `<methodCall>` +
        `<methodName>chatter</methodName>` +
        `<params>` +
        `<param>` +
        `<value>` +
        '<struct>' +
        '<member>' +
        '<name>message</name>' +
        `<value><string>${message}</string></value>` +
        '</member>' +
        '<member>' +
        '<name>limit</name>' +
        `<value><i4>${limit}</i4></value>` +
        '</member>' +
        '</struct>' +
        '</value>' +
        '</param>' +
        '</params>' +
        '</methodCall>';
    return str;
};

const getXmlArray = (numbers)=>{
    const doc = new DOMParser().parseFromString('<t />')
    const ray = doc.createElement('array');
    const data = doc.createElement('data');
    ray.appendChild(data);
    numbers.forEach(num =>{
        const v = doc.createElement("value");
        data.appendChild(v);
        const i = doc.createElement("i4");
        v.appendChild(i);
        const n = doc.createTextNode(num);
        i.appendChild(n);
    });
    const serializer = new XMLSerializer();
    return serializer.serializeToString(ray);
};
const getMathOpXml = (operation, numbers ) =>{
    const xml = getXmlArray(numbers);
    const str = `<?xml version="1.0"?>` +
        `<methodCall>` +
        `<methodName>${operation}</methodName>` +
        `<params>` +
        `<param>` +
        `<value>${getXmlArray(numbers)}</value>` +
        `</param>` +
        `</params>` +
        `</methodCall>`;
    return str;
};

describe('Basic xml-http Tests: ', () => {
    before(function () {
       const {server} = require('../server');
       app = server;
    });

    after(function () {
        app.httpServer.close();
        console.log({message: `xml-grpc server shutdown at ${new Date()}`})
    });

    it('Can POST add', function (done) {
        const arr = getRandomArray();
        const xml = getMathOpXml('add', arr);
        const answer = arr.reduce((a, b) => a + b, 0);
        const options = {
            method: 'POST',
            url: 'localhost',
            path: '/',
            port: XML_RPC_SERVER_PORT,
            headers: {
                'User-Agent': 'request',
                'Content-Type': 'text/xml',
                'Content-length': xml.length
            }
        };

        const req = http.request( options, function( res )    {
            let buffer = "";
            console.log( res.statusCode );

            res.on( "data", function( data ) {
                buffer = buffer + data;
            } );
            res.on( "end", function( data ) {
                const json = convert.xml2json(buffer, {compact: true, spaces: 1});
                const result = (JSON.parse(json));
                const i = Number(result.methodResponse.params.param.value.int._text);
                expect(i).to.equal(answer);
                console.log( result );
                done();
            });
        });
        req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
            done(e);
        });

        req.write( xml );
        req.end();
    });

    it('Can POST ping', function (done) {
        const str = faker.lorem.words(3) ;
        const xml = getPingXml(str);
        const options = {
            method: 'POST',
            url: 'localhost',
            path: '/',
            port: XML_RPC_SERVER_PORT,
            headers: {
                'User-Agent': 'request',
                'Content-Type': 'text/xml',
                'Content-length': xml.length
            }
        };

        const req = http.request( options, function( res )    {
            let buffer = "";
            console.log( res.statusCode );

            res.on( "data", function( data ) {
                buffer = buffer + data;
            } );
            res.on( "end", function( data ) {
                const json = convert.xml2json(buffer, {compact: true, spaces: 1});
                const result = (JSON.parse(json));
                expect(result.methodResponse.params.param.value.string._text).to.equal(`["${str}"]`);
                console.log( result );
                done();
            });
        });
        req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
            done(e);
        });

        req.write( xml );
        req.end();
    });

    it('Can POST chatter', function (done) {
        const message = faker.lorem.word(2);
        const limit = Math.floor((Math.random() * 100) + 1);;
        const xml = getChatterXml(message, limit);
        const options = {
            method: 'POST',
            url: 'localhost',
            path: '/',
            port: XML_RPC_SERVER_PORT,
            headers: {
                'User-Agent': 'request',
                'Content-Type': 'text/xml',
                'Content-length': xml.length
            }
        };

        const req = http.request( options, function( res )    {
            let buffer = "";
            console.log( res.statusCode );

            res.on( "data", function( data ) {
                buffer = buffer + data;
            } );
            res.on( "end", function( data ) {
                const json = convert.xml2json(buffer, {compact: true, spaces: 1});
                const result = (JSON.parse(json));
                result.methodResponse.params.param.value.array.data.value.forEach(item => {
                        expect(item.struct.member[0].value.string._text).to.equal(message);
                });

                done();
            });
        });
        req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
            done(e);
        });

        req.write( xml );
        req.end();
    })
});