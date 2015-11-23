var generators = require('yeoman-generator');
var path = require('path');
var mkdirp = require('mkdirp');

module.exports = generators.Base.extend({
    constructor: function() {
        this.realCWD = process.cwd();

        generators.Base.apply(this, arguments);

        this.argument('file', {
            type: String,
            required: true
        });

        this.extLength = 3;

        this.subTestFolders = ['Spec', 'Setup', 'Config'];

        this.GLOBAL_SPEC = 'tests/jasmine_tests/spec';
    },
    wiring: function() {
        mkdirp(this.GLOBAL_SPEC + this._getFilePath(), function(err) {
            if (err) console.error(err)
        });

        if (this.config.get('bespokeConfig')) {
            this.subTestFolders.pop();
        }

        if (this._isPhpFile(this.file)) {
            this.GLOBAL_SPEC = 'tests';
            this.extLength = 4;
            this._writePhpTestFiles();

            return;
        }

        for (var i = 0; i < this.subTestFolders.length; i++) {
            this._writeTestFiles(this.subTestFolders[i]);
        }
    },
    prompting: function() {
        if (this._isPhpFile(this.file)) {
            return;
        }

        var done = this.async();
        this.prompt({
            type: 'confirm',
            name: 'bespokeConfig',
            message: 'Would you like to create a config file?',
        }, function(answer) {
            this.config.set(answer);
            done();
        }.bind(this));
    },
    _getFilePath: function() {
        return this._getSkinPath() + '/' + this._getTestFolder();
    },
    _getSkinPath: function() {
        var locationOfFile = this.realCWD;
        return locationOfFile.slice(locationOfFile.indexOf('/skin/'));
    },
    _getFileWithoutExt: function() {
        var fileLength = this.file.length;
        return this.file.substring(0, fileLength - this.extLength);
    },
    _getTestFolder: function() {
        var folderStart = this._getFileWithoutExt();
        var folderEnd = 'Test';

        return folderStart + folderEnd;
    },
    _writeTestFiles: function(testFolderEndName) {
        var testPath = this.GLOBAL_SPEC +
            this._getFilePath() +
            '/' +
            this._getFileWithoutExt() +
            testFolderEndName;

        this.fs.copyTpl(
            this.templatePath(testFolderEndName + '.js'),
            this.destinationPath(testPath + '.js'), {
                filename: this._getFileWithoutExt()
            }
        );
    },
    _writePhpTestFiles: function() {
        var locationOfFile = this.realCWD;
        var testPath = this._getFilePath() +
            '.php';

        locationOfFile = locationOfFile.replace(this.destinationRoot() + '/', '');

        var testPath = 'tests/' + 
            locationOfFile + 
            this._getTestFolder() + 
            '.php';

        this.fs.write(testPath, 'Php test');    
    },
    _isPhpFile: function(files) {
        var fileLength = this.file.length;
        var ext = this.file.substring(fileLength - 4, fileLength);
        return (ext === '.php');
    }
});