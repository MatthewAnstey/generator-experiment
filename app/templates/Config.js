module.exports = function (globalSetup, srcDirectory, globalVendor) {
    
    var filePath = srcDirectory + '/<%= filename %>.js';
    var configuration = {};

    configuration[filePath] = {
        src: [filePath],
        options: {
            specs: [__dirname + '/<%= filename %>Spec.js'],
            helpers: [__dirname + '/<%= filename %>Setup.js'],
            
            template: require('grunt-template-jasmine-istanbul'),

            templateOptions: {
                coverage: 'coverage/info.json',
                report: [
                  {
                    type: 'lcov',
                    options: {
                      dir: 'coverage'
                    }
                }],
                thresholds: {
                    lines: 10,
                    statements: 10,
                    branches: 10,
                    functions: 10
                }
            },

            vendor: [
                globalSetup, 
                globalVendor
            ]
        }
    };

    return configuration;
};
