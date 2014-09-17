Downloading and Running the Project Locally
===========================================

0. Install [NodeJS](http://nodejs.org/download/ "NodeJS Download") on your machine
1. Clone the project
2. Open the project folder on your machine and run **> npm install**
3. To start the server, run **> node app.js**

IBM Bluemix
-----------------------------------
This project is deployed on IBM Bluemix. The following are the steps to get up and running:

1. [Install the cf command-line tool](https://www.ng.bluemix.net/docs/#starters/BuildingWeb.html#install_cf).
2. Browse to the Bluemix NodeJS project folder
4. Connect to Bluemix:

		cf api https://api.ng.bluemix.net

5. Log into Bluemix:

		cf login -u [email] 
		cf target -o [email] -s dev

6. Deploy the app:

		cf push node-no-cache

7. Access the app: [truck-muncher.mybluemix.net](//truck-muncher.mybluemix.net)
