'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var sinon = require('sinon');
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

});