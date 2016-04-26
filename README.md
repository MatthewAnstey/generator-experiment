# Jasmine Test Generator

Supports both JS and PHP tests.

Yeoman generator to scaffold the test folder structure for our webapps.

## Install Yeoman

* Use npm to install Yeoman:

    ``` 
    npm install -g yo
    ```
    
## Install the generator

* Clone this directory: ensure it goes into a folder called `generator-jasmine-test` as Yeoman relies on the file system to find available generators. It doesn't need to be within the project that you want to use it on, in fact, it shouldn't be!


* Install the generator's dependencies if they are not already installed. From within your new `generator-jasmine-test` folder:

    ```
    npm install
    ```

* npm link the generator from inside the `generator-jasmine-test` directory.

    ```
    npm link
    ```

## Set up project for use with Yeoman

* Place `.yo-rc.json` file at the root of the project you want to test. It will need to have an empty object `{}` inside of it.

## Create the files

* Go into the directory of the file you want to test and do:

    ```
    yo jasmine-test file-you-want-to-test.js
    ```

  * Additionally you can be in another location within the project when you do this, as long as you pass a path to the `file-you-want-to-test.js` that's relative to your current location.

* Add `--config` to the end of the `yo` command if you want a config file to be created.

### Troubleshooting

We use `nodenv` to manage our Node.js versions. There can be a globally used version, which should be >4.0.0 as of Feb '16 (type `nodenv global` at the command line to check), and also versions specific to the project you are working on, which are indicated by the presence of a `.node-version` file in the project root and which can be verified by typing `nodenv local` at the command line.

* The generator makes extensive use of Node's `path.parse()` method, which was added in Node version 12. The `path-parse` package is a polyfill for users with <v0.12 that falls back to the native method if it exists.

* **Node versions should match between where you installed the generator and the proejct**. Is the generator installed on this version of Node? Type `yo --help` within the project to see. If it's not, go back to the `generator-jasmine-test` root directory, change the `nodenv` version to match the project's (`nodenv local x.x.x`) and reinstall the generator (`npm i` followed by `npm link`). It should now run.

## Run the tests

Clone the project, install all the dependencies with `npm install`, the run `npm test`.

Generate coverage reports with `npm run cover`.
