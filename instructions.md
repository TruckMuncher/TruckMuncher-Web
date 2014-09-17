Get started with Bluemix
-----------------------------------
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

