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
var HandlerClass    = require('./RequestHandler.js').Handler,
    ErrorResponse   = require('./ErrorResponse.js').ErrorResponse;

// Local vars 
var supportedMethods = {
    'GET': true,
    'POST': true
};


var Router = function(app) {
    var self = this;
    this.app = app;
    this.Handler = new HandlerClass(app);

    // Private methods
    var _route = function (request, response) {
        // The 'true' here signals that we want an object with all of the query
        // parameters in the 'query' property, rather than a plain string.
        var urlData = url.parse(request.url, true);

        if (request.method in supportedMethods) {
            // Valid request handlers have names like 'GET/home'.
            var requestName = request.method + urlData.pathname;

            if (requestName in self.Handler.handle) {
                // POST (and PUT/UPDATE) need special handling to accomodate the
                // associated data coming in.
                if (request.method === 'POST') {
                    request.addListener('data', function(postDataChunk) {
                        postData += postDataChunk;
                    });
                    request.addListener('end', function() {
                        self.Handler.handle[requestName](response, urlData, postData);
                    });
                } else {
                    self.Handler.handle[requestName](response, urlData);
                }
            } else {
                // Maybe its a request for a specific file
                self.Handler.serveStatic(response, urlData.pathname);
            }
        } else {
            //Disallowed HTTP method
            ErrorResponse.show(response, 405);
        }
    };
    
    // Public interface
    this.route = _route;
    return this;
};

exports.Router = Router;
