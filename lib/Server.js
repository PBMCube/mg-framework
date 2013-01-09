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
var Router      = require('./server_lib/Router.js').Router;

// Local vars
var Mindgames = {};

// Local functions
function onRequest (request, response) {
    Router.route(request, response);
}

// Export object
var Server = {};
Server.start = function (app) {
    Mindgames = app;
    Router.setApp(app);
    http.createServer(onRequest).listen(9003);
    console.log("Server's runnin'");
}

exports.Server = Server;
