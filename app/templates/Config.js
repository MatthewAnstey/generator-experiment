module.exports = function (globals, srcDirectory) {

    var filePath = srcDirectory + '/<%= filename %>.js';
    var configuration = {};

    configuration[filePath] = {
        src: [filePath],
        options: {
            specs: [__dirname + '/<%= filename %>Spec.js'],
            helpers: [__dirname + '/<%= filename %>Setup.js'],

            vendor: [
                globals.globalSetUp.beforeVendor,
                globals.globalVendor,
                globals.globalSetUp.afterVendor
            ]
        }
    };

    return configuration;
};