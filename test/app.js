'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
// These are mostly for testing console.log output
var sinon = require('sinon');
var chai = require('chai');
var expect = require('chai').expect;
var sinonChai = require("sinon-chai");
chai.use(sinonChai);

var fs = require('fs');

describe('generator-jasmine-test:app', function () {
    
    describe('without config', function() {
        before(function(done) {
            // need to stub in order for _directoryCheck() to run 
            sinon.stub(fs, 'stat');
            
            helpers.run(path.join(__dirname, '../app'))
                .withArguments(['index.js'])
                .on('end', done);
        });
        
        after(function() {
            // unwrap Sinon stubbed method
            fs.stat.restore(); 
        });
        
        it('creates Spec and Setup files', function () {
            assert.file([
                'tests/jasmine_tests/spec/indexTest/indexSpec.js',
                'tests/jasmine_tests/spec/indexTest/indexSetup.js'
            ]);
            assert.noFile([
                'tests/jasmine_tests/spec/indexTest/indexConfig.js'
            ]);
            assert.fileContent('tests/jasmine_tests/spec/indexTest/indexSpec.js',
                                /describe\('Write a test suite', function\(\) \{/);
            assert.fileContent('tests/jasmine_tests/spec/indexTest/indexSetup.js',
                                /\/\/ This will run before your tests/);
        });
        
    });
    
    describe('with config', function() {
        before(function(done) {
            sinon.stub(fs, 'stat');
            
            helpers.run(path.join(__dirname, '../app'))
                .withArguments(['index.js'])
                .withOptions({config: true})
                .on('end', done);
        });
        
        after(function() {
            fs.stat.restore(); 
        });
        
        it('creates Spec, Setup and Config files', function () {
            assert.file([
                'tests/jasmine_tests/spec/indexTest/indexSpec.js',
                'tests/jasmine_tests/spec/indexTest/indexSetup.js',
                'tests/jasmine_tests/spec/indexTest/indexConfig.js'
            ]);
            assert.fileContent('tests/jasmine_tests/spec/indexTest/indexSpec.js',
                                /describe\('Write a test suite', function\(\) \{/);
            assert.fileContent('tests/jasmine_tests/spec/indexTest/indexSetup.js',
                                /\/\/ This will run before your tests/);
            assert.fileContent('tests/jasmine_tests/spec/indexTest/indexConfig.js',
                                /var filePath = srcDirectory \+ '\/index\.js';/);
            
        });
    });

    describe('File does not exist', function() {
        var log;

        before(function(done) {
            // First stub out console.log so we can record what's printed out
            log = console.log;
            // fix so that Mocha reporter still outputs stuff to console
            sinon.stub(console, 'log', function() {
              return log.apply(log, arguments);
            });

            helpers.run(path.join(__dirname, '../app'))
                .withArguments(['index.js'])
                .on('end', done);
        });

        it('logs a message to the user', function() {
            assert.noFile([
                'tests/jasmine_tests/spec/indexTest/indexSpec.js',
                'tests/jasmine_tests/spec/indexTest/indexSetup.js',
                'tests/jasmine_tests/spec/indexTest/indexConfig.js'
            ]);
            expect(console.log).to.have.been.called;
            expect(console.log).to.have.been.calledWith("Error: directory does not exist");
        });
    });

});