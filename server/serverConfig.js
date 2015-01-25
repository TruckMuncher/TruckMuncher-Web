var fs = require('fs'),
    https = require('https'),
    http = require('http');

var port = (process.env.VCAP_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || 'localhost');

if (host !== 'localhost') {
    var privateKey = fs.readFileSync('/etc/ssl/truckmuncher-web/truckmuncher_web.key', 'utf8');
    var certificate = fs.readFileSync('/etc/ssl/truckmuncher-web/truckmuncher_com.crt', 'utf8');
    var chain = fs.readFileSync('/etc/ssl/truckmuncher-web/truckmuncher_com_intermediates.pem', 'utf8');
    var credentials = {key: privateKey, cert: certificate, ca: [chain]};
}

var httpsServer, httpServer;

var servers = {
    getHttpsServer: function (app) {
        if (host !== 'localhost') {
            if (!httpsServer) httpsServer = http.createServer(credentials, app).listen(port);
            return httpsServer;
        } else {
            return null;
        }
    },
    getHttpServer: function (app) {
        var httpPort = host === 'localhost' ? port : 80;
        if (!httpServer) httpServer = http.createServer(app).listen(httpPort);
        return httpServer;
    }
};

module.exports = servers;