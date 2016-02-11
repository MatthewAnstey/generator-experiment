'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var sinon = require('sinon');
var fs = require('fs');

describe('generator-jasmine-test:app', function () {
    
    describe('without config', function() {
        before(function(done) {
            sinon.stub(fs, 'stat');
            
            helpers.run(path.join(__dirname, '../app'))
                .withArguments(['index.js'])
                .on('end', done);
        });
        
        it('creates Spec and Setup files', function (done) {
            assert.file([
                'tests/jasmine_tests/spec/indexTest/indexSpec.js',
                'tests/jasmine_tests/spec/indexTest/indexSetup.js'
            ]);
            assert.noFile([
                'tests/jasmine_tests/spec/indexTest/indexConfig.js'
            ]);
            fs.stat.restore(); 
            done();
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
        
        
        it('creates Spec, Seup and Config files', function (done) {
            assert.file([
                'tests/jasmine_tests/spec/indexTest/indexSpec.js',
                'tests/jasmine_tests/spec/indexTest/indexSetup.js',
                'tests/jasmine_tests/spec/indexTest/indexConfig.js'
            ]);
            fs.stat.restore(); 
            done();
        });
    });
    
    //assert file contents
});