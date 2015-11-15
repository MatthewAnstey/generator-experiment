# Jasmine Test Generator

Supports both JS and PHP tests

1) Install yeoman 

`npm install -g yo bower grunt-cli gulp`


2) Place .yo-rc.json file at the root of the project you want to test. It will need to have and empty object {} inside of it.

3) npm link the node module

`npm link`

4) Go into the directory of the file you want to test and do

`yo jasmine-test file-you-want-to-test.js`

5) Add `--config` if you want a config file to be created
