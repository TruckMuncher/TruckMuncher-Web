var fs = require('fs'),
    https = require('https'),
    http = require('http'),
    constants = require('constants');

var port = (process.env.VCAP_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || 'localhost');

var options;

if (host !== 'localhost') {
    privateKey = fs.readFileSync('/etc/ssl/truckmuncher-web/truckmuncher_web.key', 'utf8');
    certificate = fs.readFileSync('/etc/ssl/truckmuncher-web/truckmuncher_com.crt', 'utf8');
    secureServerChain = fs.readFileSync('/etc/ssl/truckmuncher-web/COMODORSADomainValidationSecureServerCA.crt', 'utf8');
    addTrustChain = fs.readFileSync('/etc/ssl/truckmuncher-web/COMODORSAAddTrustCA.crt', 'utf8');
    rootChain = fs.readFileSync('/etc/ssl/truckmuncher-web/AddTrustExternalCARoot.crt', 'utf8');
    options = {
        key: privateKey,
        cert: certificate,
        ca: [secureServerChain, addTrustChain, rootChain],
        secureOptions: constants.SSL_OP_NO_SSLv3 | constants.SSL_OP_NO_SSLv2,
        secureProtocol: 'SSLv23_method',
        ciphers: 'ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:AES128-GCM-SHA256:HIGH:!MD5:!aNULL',
        honorCipherOrder: true
    };
}

var httpsServer, httpServer;

var servers = {
    getHttpsServer: function (app) {
        if (host !== 'localhost') {
            if (!httpsServer) httpsServer = https.createServer(options, app).listen(port);
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