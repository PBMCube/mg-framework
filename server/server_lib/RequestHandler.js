/*
 * Filename: RequestHandler.js
 * Mindgames HTTP Server Request Handler module
 * Author: Ben Tyler
 * Date: Jan 5, 2013
 * License: Artistic License 2.0
 *
 */

// Node modules
var fs          = require('fs'),
    path        = require('path'),
    http        = require('http'),
    querystring = require('querystring');

// Mindgames libs
var ErrorResponse   = require('./ErrorResponse.js').ErrorResponse;

// Module vars (like protected static class vars)
var knownExtensions = {
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.html': 'text/html'
};

var allowedDirs = {
    'public': true,
    'games': true,
    'shared': true
};

var Mindgames = {};

//class definition
var Handler = function (app) {
    Mindgames = app;
    var self = {};
    
    //Private methods
    var _serveStatic = function (response, urlToServe) {
        // Basic security - don't let a URL start navigating the filesystem
        var sanitizedURL = urlToServe.replace(/\.{2}/g, 'NO').substring(1);
        // Make sure that the request is for a dir we're ok accessing.
        var dir = sanitizedURL.split("/")[0];
        var filePath = dir in allowedDirs ? sanitizedURL : '';
        var ext = path.extname(filePath);

        // js is as cool as Lua! 
        var contentType = knownExtensions[ext] || 'text/plain';
        fs.exists(filePath, function (exists) {
            if (exists) {
                fs.readFile(filePath, function (error, content) {
                    if (error) {
                        response.writeHead(500);
                        response.end();
                    }
                    else {
                        response.writeHead(200, {'Content-Type': contentType});
                        response.end(content, 'utf-8');
                    }
                });
            }
            else {
                ErrorResponse.show(response, 404);
            }
        });
    };

    var _landingPage = function (response, urlData) {
        _serveStatic(response, '/public/splash.html');
    };

    var _showLobby = function (response, urlData) {
        _serveStatic(response, '/public/mindgames.html');
    };

    // Public interface
    self.serveStatic = _serveStatic;

    // Request Handler mapping split by HTTP request
    self.handle = {}
    // GET
    self.handle['GET/'] = _landingPage;
    self.handle['GET/lobby'] = _showLobby;
    return self;
};

exports.Handler = Handler;
