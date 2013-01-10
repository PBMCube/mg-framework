/*
 * Filename: Server.js
 * Mindgames HTTP Server module
 * Author: Ben Tyler
 * Date: Jan 5, 2013
 * License: Artistic License 2.0
 *
 */

// Node modules
var http        = require('http');

// Mindgames libs
var RouterClass      = require('./server_lib/Router.js').Router;

// Private variables
var Mindgames = {};

// Private methods

// Public Interface
var Server = function (port, app) {
    var self = this;
    this.app = app;
    this.Router = new RouterClass(app);

    var _onRequest = function (request, response) {
        self.Router.route(request, response);
    }
    
    http.createServer(_onRequest).listen(port);
    console.log("Server's runnin'");
    return this;
}

exports.Server = Server;
