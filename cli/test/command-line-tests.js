//let {server} = require("../../server/server");
/*
DON'T FORGET TO START THE SERVER

THIS STILL UNDER CONSTRUCTION. For now I am using it as a command line runner
 */
const shell = require('shelljs');
const stdout = require("test-console").stdout;
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const after = require('mocha').after;
const faker = require('faker');

function mathCall (operation, numbers) {

}

describe('Basic Client CLI Tests: ', () => {
    after(function() {
        //server.forceShutdown();
        //console.log({message: `gRPC server shutdown at ${new Date()}`})
    });
    const filespec = process.cwd() + '/index.js';

    it('Can call Help on CLI', function (done) {
        const operation = 'add';
        const numbers = [2,2];
        shell.exec(`node ${filespec} -h`);
        done();
    })

    it('Can call Ping on CLI', function (done) {
        const operation = 'add';
        const numbers = [2,2];
        shell.exec(`node ${filespec} -o ping -m "Hi There"`);
        console.log('\n');
        done();
    })

    it('Can call ADD on CLI', function (done) {
        const operation = 'add';
        const numbers = [2,2];
        shell.exec(`node ${filespec} -o ${operation} -d ${JSON.stringify(numbers)}`);
        console.log('\n');
        done();
    })

    it('Can call Multiple on CLI', function (done) {
        const operation = 'multiply';
        const numbers = [6,2];
        shell.exec(`node ${filespec} -o ${operation} -d ${JSON.stringify(numbers)}`);
        console.log('\n');
        done();
    })

    it('Can call Divide on CLI', function (done) {
        const operation = 'divide';
        const numbers = [2,4];
        shell.exec(`node ${filespec} -o ${operation} -d ${JSON.stringify(numbers)}`);
        console.log('\n');
        done();
    })

    it('Can call Chatter on CLI', function (done) {
        const operation = 'chatter';
        const message = faker.lorem.words(4);
        const cnt = 12;
        shell.exec(`node ${filespec} -o ${operation} -m ${message} -c ${cnt} -v true`);
        console.log('\n');
        done();
    })
});

