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

        for (var i = 0; i < this.subTestFolders.length; i++) {
            this._writeTestFiles(this.subTestFolders[i]);
        }

    },
    prompting: function() {
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
        var locationOfFile = this.realCWD;
        var skinPath = locationOfFile.slice(locationOfFile.indexOf('/skin/'));

        return skinPath + '/' + this._getTestFolder();
    },
    _getFileWithoutExt: function() {
        var fileLength = this.file.length;
        return this.file.substring(0, fileLength - 3);
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
    }
});