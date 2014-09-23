// The IP address of the Cloud Foundry DEA (Droplet Execution Agent) that hosts this application:
var host = (process.env.VCAP_APP_HOST || 'localhost');
// The port on the DEA for communication with the application:
var port = (process.env.VCAP_APP_PORT || 3000);

var ids = {
	facebook: {
		clientID: '691864144229001',
		clientSecret: '7d8f94b356f6540a440d53abd34e4f80',
		callbackURL: 'http://' + host + ':' + port + '/auth/facebook/callback'
	},
	twitter: {
		consumerKey: 'KCWZ6nlCEykT9S7AjGqJwEsM8',
		consumerSecret: 'userPqxIrLjeKGDrURvZMWclgIWKsP5WslVEadMU7ii1cJtSqF',
		callbackURL: 'http://' + host + ':' + port + '/auth/twitter/callback'
	}
};

module.exports = ids;
