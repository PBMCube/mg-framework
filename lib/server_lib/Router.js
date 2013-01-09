/*
 * Filename: Router.js
 * Mindgames HTTP Server Router module
 * Author: Ben Tyler
 * Date: Jan 5, 2013
 * License: Artistic License 2.0
 *
 */

// Node modules
var url         = require('url');

// Mindgames libs
var Handler     = require('./RequestHandler.js').Handler,
    ErrorResponse = require('./ErrorResponse.js').ErrorResponse;

// Local vars 
var Mindgames = {};
var supportedMethods = {
    'GET': true,
    'POST': true
}

// Local functions
//
// Export object
var Router = {};

Router.setApp = function (app) {
    Mindgames = app;
    Handler.setApp(app);
};

Router.route = function (request, response) {
    // The 'true' here signals that we want an object with all of the query
    // parameters in the 'query' property, rather than a plain string.
    var urlData = url.parse(request.url, true);
    if (request.method in supportedMethods) {
        // Valid request handlers have names like 'GET/home'.
        var requestName = request.method + urlData.pathname;
        console.log(requestName);
        if (requestName in Handler.handle) {
            // POST (and PUT/UPDATE) need special handling to accomodate the
            // associated data coming in.
            if (request.method === 'POST') {
                request.addListener('data', function(postDataChunk) {
                    postData += postDataChunk;
                });
                request.addListener('end', function() {
                    Handler.handle[requestName](response, urlData, postData);
                });
            } else {
                Handler.handle[requestName](response, urlData);
            }
        } else {
            // Maybe its a request for a specific file
            Handler.serveStatic(response, urlData.pathname);
        }
    } else {
        ErrorResponse.show(response, 405);
    }
};

exports.Router = Router;
