// The IP address of the Cloud Foundry DEA (Droplet Execution Agent) that hosts this application:
var host = (process.env.VCAP_APP_HOST || 'localhost');
// The port on the DEA for communication with the application:
var port = (process.env.VCAP_APP_PORT || 3000);
var url = JSON.parse(process.env.VCAP_APPLICATION || '{"uris":["' + host + ':' + port + '"]}').uris[0];
//var url = process.env.VCAP_APPLICATION ? 'DevTruckMuncher.mybluemix.net' : host + ':' + port;

var protocol = host === 'localhost' ? 'http://' : 'https://';


var ids = {
	facebook: {
		clientID: process.env.FACEBOOK_CLIENT_ID || 'facebook_client_id',
		clientSecret: process.env.FACEBOOK_CLIENT_SECRET || 'facebook_client_secret',
		callbackURL: protocol + url + '/auth/facebook/callback'
	},
	twitter: {
		consumerKey: process.env.TWITTER_CONSUMER_KEY || 'twitter_consumer_key',
		consumerSecret: process.env.TWITTER_CONSUMER_SECRET || 'twitter_consumer_secret',
		callbackURL: protocol + url + '/auth/twitter/callback'
	}
};

module.exports = ids;
