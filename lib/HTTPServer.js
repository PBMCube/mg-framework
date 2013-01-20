/*
 * Filename: Server.js
 * Mindgames HTTP Server module
 * Author: Ben Tyler
 * Date: Jan 5, 2013
 * License: Artistic License 2.0
 *
 * The purpose of this module is to be a simple HTTP server, capable of routing
 * traffic to the appropriate endpoints and serving static files.
 *
 */

// Node modules
var http        = require('http');

// Mindgames libs
var RouterClass      = require('./server_lib/Router.js').Router;

// Module vars (like protected static class vars)

// Module functions (like protected static class methods)

var Server = function (port, app) {
    var self = {};
    self.app = app;
    self.Router = RouterClass(app);

    var _onRequest = function (request, response) {
        self.Router.route(request, response);
    }
    
    http.createServer(_onRequest).listen(port);
    console.log("Server's runnin'");

    return self;
}

exports.Server = Server;
