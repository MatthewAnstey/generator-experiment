'use strict';

var generators = require('yeoman-generator');
var path = require('path');
var pathParse = require('path-parse');
var mkdirp = require('mkdirp');
var fs = require('fs');
var chalk = require('chalk');

module.exports = generators.Base.extend({
    directoryDoesNotExist: false,
    constructor: function() {
        this.realCWD = process.cwd();

        generators.Base.apply(this, arguments);

        this.option('config');

        this.argument('file', {
            type: String,
            required: true
        });

        var filePath = this.realCWD + path.sep + this.file;
        var self = this;
        this._directoryCheck(filePath, function(err) {
            console.log("Error: directory does not exist");
            self.directoryDoesNotExist = true;
        });
        this.pathObject = pathParse(filePath);

        this.subTestFolders = ['Spec', 'Setup', 'Config'];

        this.JS_GLOBAL_SPEC = 'tests/jasmine_tests/spec';
        this.PHP_GLOBAL_SPEC = 'tests';
    },
    wiring: function() {
        if (this.directoryDoesNotExist) {
            // prefer this to process.exit() as it doesn't completely kill node
            return;
        }

        if (!this.options.config) {
            this.subTestFolders.pop();
        }

        if (this._isPhpFile()) {
            this._writePhpTestFiles();

            return;
        }

        for (var i = 0; i < this.subTestFolders.length; i++) {
            this._writeJSTestFile(this.subTestFolders[i]);
        }

    },
    _getWriteFilePath: function() {
        var locationOfFile = this.pathObject.dir;
        var skinPath = locationOfFile.replace(this.destinationPath(), '');

        return skinPath;
    },
    _getFileWithoutExt: function() {
        return this.pathObject.name;
    },
    _getFileWithTestSuffix: function() {
        return this._getFileWithoutExt() + 'Test';
    },
    _writeJSTestFile: function(testFolderEndName) {
        var testPath = this.JS_GLOBAL_SPEC +
            this._getWriteFilePath() +
            path.sep + 
            this._getFileWithTestSuffix() +
            path.sep +
            this._getFileWithoutExt() +
            testFolderEndName;

        this.fs.copyTpl(
            this.templatePath(testFolderEndName + '.js'),
            this.destinationPath(testPath + '.js'), {
                filename: this._getFileWithoutExt()
            }
        );
    },
    _directoryCheck: function(path, callback) {
        fs.stat(path, function(err, stat) {
            if (err) {
                callback(err);
            }
        });
    },
    _isPhpFile: function() {
        return (this.pathObject.ext === '.php');
    },
    _writePhpTestFiles: function() {
        var testPath = this.PHP_GLOBAL_SPEC +
            this._getWriteFilePath() +
            path.sep +
            this.pathObject.base;

        this.fs.write(testPath, 'PHP test');
    }
});