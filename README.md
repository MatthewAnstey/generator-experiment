# Jasmine Test Generator

Supports both JS and PHP tests

0. Clone this directory: ensure it goes into a folder called `generator-jasmine-test` as Yeoman relies on the file system to find available generators. 

1. Install Yeoman:

    ```
    npm install -g yo bower grunt-cli gulp
    ```

2. Install the generator's dependencies if they are not already installed. From within the `generator-jasmine-test` folder:

    ```
    npm install
    ```

3. npm link the node module from inside the `generator-jasmine-test` directory.

    ```
    npm link
    ```

4. Place `.yo-rc.json` file at the root of the project you want to test. It will need to have an empty object `{}` inside of it.

5. Go into the directory of the file you want to test and do:

    ```
    yo jasmine-test file-you-want-to-test.js
    ```

  * Additionally you can be in another location within the project when you do this, as long as you pass a path to the `file-you-want-to-test.js` that's relative to your current location.

6. Add `--config` if you want a config file to be created.
