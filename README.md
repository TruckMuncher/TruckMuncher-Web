Downloading and Running the Project Locally
===========================================

0. Install [NodeJS](http://nodejs.org/download/ "NodeJS Download") on your machine
1. Clone the project
2. Install all node dependencies:

        npm install
        
3. Start the server

        node app.js

IBM Bluemix
-----------------------------------
This project is deployed on IBM Bluemix. The following are the steps to get up and running:

1. [Install the cf command-line tool](https://www.ng.bluemix.net/docs/#starters/BuildingWeb.html#install_cf).
2. Browse to the this project in the command line 
3. Log into Bluemix:

		cf login -u [email] 
		cf target -o [organization (TruckMuncher)] -s [space (dev)]

4. Be sure to delete the node_modules folder before deploying the app
5. Deploy the app:

		cf push [app name (TruckMuncher)]

6. Access the app. This project's dev location is: [truck-muncher.mybluemix.net](//truck-muncher.mybluemix.net)
