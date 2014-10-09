Downloading and Running the Project Locally
===========================================

0. Install [NodeJS](http://nodejs.org/download/ "NodeJS Download") on your machine
1. Clone the project
2. Install all node dependencies:

        npm install
3. Install nodemon. This package will monitor your file system and restart the node server whenever changes are made:

        npm install -g nodemon
        
4. Set the environment variables for OAuth:

        export FACEBOOK_CLIENT_ID=[key]
        export FACEBOOK_CLIENT_SECRET=[key]
        export TWITTER_CONSUMER_KEY=[key]
        export TWITTER_CONSUMER_SECRET=[key]
        
	Note, to do for environment variables to be permanent, you will need to put these in one of the following:
	* ~/.profile
	* ~/.bash_profile
	* /etc/profile
	
	You may also need to start a new terminal session after this step.

5. Start the server

        nodemon app.js
        
Karma and Jasmine Tests Locally
-----------------------------------
1. Install PhantomJS (http://phantomjs.org/download.html). For homebrew on mac:

        brew update && brew install phantomjs

2. (Optional since we're using Grunt to run karma) Install the karma cli so you can run karma as a command

        sudo npm install -g karma-cli
        
3. Install grunt-cli:

        sudo npm install -g grunt-cli

4. Run karma

        grunt karma:unit 


IBM Bluemix
-----------------------------------
This project is deployed on IBM Bluemix. The following are the steps to get up and running:

1. [Install the cf command-line tool](https://www.ng.bluemix.net/docs/#starters/BuildingWeb.html#install_cf).
2. Browse to the this project in the command line 
3. Log into Bluemix:

		cf login -u [email] 
		cf api https://api.ng.bluemix.net
		cf target -o [organization (TruckMuncher)] -s [space (dev)]

4. Be sure to delete the node_modules folder before deploying the app
5. Deploy the app:

		cf push [app name (TruckMuncher)]

6. Access the app. This project's dev location is: [truck-muncher.mybluemix.net](//truck-muncher.mybluemix.net)
