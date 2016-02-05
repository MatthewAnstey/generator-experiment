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

Make sure your `node -v` and `nodenv global` are >4.0.0 as Yeoman has issues with lesser versions.
