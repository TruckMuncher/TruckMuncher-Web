[![Coverage Status](https://coveralls.io/repos/TruckMuncher/TruckMuncher-Web/badge.svg?branch=master)](https://coveralls.io/r/TruckMuncher/TruckMuncher-Web?branch=master)

Downloading and Running the Project Locally
===========================================

0. Install [NodeJS](http://nodejs.org/download/ "NodeJS Download") on your machine
1. Clone the project
2. Install all node dependencies:

        npm install
3. Install grunt-cli:

        sudo npm install -g grunt-cli
3. To make the requests to the API, you should be running it locally. The easiest way to do this would be by running the vagrant VM provided in the API repository.
3. Set the environment variables for OAuth:

        export FACEBOOK_CLIENT_ID=[key]
        export FACEBOOK_CLIENT_SECRET=[key]
        export TWITTER_CONSUMER_KEY=[key]
        export TWITTER_CONSUMER_SECRET=[key]
        export API_URL=http://truckmuncher:8443
        
	Note, to do for environment variables to be permanent, you will need to put these in one of the following:
	* ~/.profile
	* ~/.bash_profile
	* /etc/profile
	* ~/.bashrc
	
	You will need to also run `source ~/.bash_profile` or start a new terminal session after this step.

4. Start the server

        node app.js
        
Karma and Jasmine Tests Locally
-----------------------------------
1. Install PhantomJS (http://phantomjs.org/download.html). For homebrew on mac:

        brew update && brew install phantomjs

2. (Optional since we're using Grunt to run karma) Install the karma cli so you can run karma as a command

        sudo npm install -g karma-cli
        


3. Run karma

        grunt karma:unit 

Building the source
-----------------------------------
* When you make changes to the less files, the grunt tasks 'less' and 'cssmin' need to be run so that the less files 
get converted to css, minified, and placed in the correct directory.

* When you add a new bower component, run 'grunt:bower'.

* When you make changes to the angular application in app/**/*.js or add libraries to lib, you will need to run 'grunt concat:dev'
to concatenate all of the javascript files into on giant file that is placed in public/js. 

* If you don't want to worry about remembering to do these things, run the following command that watches the files and automatically compiles
the sources as well as runs the karma tests, jshint and starts a nodemon instance:

        grunt dev
        
* To build the production, minified javascripts, run:

        grunt build-prod
        
* To get growl notifications to correctly show up, make sure that the "OS X Notifications" setting is set to "OFF" in the growl preferences.

