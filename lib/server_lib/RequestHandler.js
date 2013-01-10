/*
 * Filename: RequestHandler.js
 * Mindgames HTTP Server Request Handler module
 * Author: Ben Tyler
 * Date: Jan 5, 2013
 * License: Artistic License 2.0
 *
 */

// Node modules
var sys         = require('sys'),
    fs          = require('fs'),
    path        = require('path'),
    http        = require('http'),
    querystring = require('querystring');

// Mindgames libs
var ErrorResponse   = require('./ErrorResponse.js').ErrorResponse;

// Local vars 
var Mindgames = {};
var allowedExtensions = {
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.html': 'text/html'
}

// Local functions
var _serveStatic = function (response, urlToServe) {
    // Basic security - don't let a URL start navigating the filesystem
    var sanitizedURL = urlToServe.replace(/\.{2}/g, 'NO');
    var filePath = 'public' + sanitizedURL;
    var ext = path.extname(filePath);

    // js is as cool as Lua! -- table based program flow plus default
    // handling in one line.
    var contentType = allowedExtensions[ext] || 'text/plain';

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
}

var _landingPage = function (response, urlData) {
    _serveStatic(response, '/index.html');
}

var _showLobby = function (response, urlData) {
    if (typeof urlData.query['user-name'] === 'undefined') {
        _serveStatic(response, '/index.html');
    } else {
        var playerID = Mindgames.PlayerManager.register(querystring.unescape(urlData.query['user-name']));
        _serveStatic(response, '/chat.html');
    }
}

var _showGame = function (response, urlData) {
    _serveStatic(response, '/game.html');
}

// Public interface
var Handler = function (app) {
    var self = this;
    Mindgames = app;
    // For known locations, like /game/
    this.handle = {}
    // Could it be...static files?
    this.serveStatic = _serveStatic;

    // Request Handler mapping split by HTTP request
    // GET
    this.handle['GET/'] = _landingPage;
    this.handle['GET/lobby'] = _showLobby;
    this.handle['GET/game'] = _showGame;

    return this;
};

exports.Handler = Handler;
