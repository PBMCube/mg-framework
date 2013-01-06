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
    http        = require('http');

// Mindgames modules
var ErrorResponse = require('./ErrorResponse.js').ErrorResponse;

// Local vars 
var allowedExtensions = {
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.html': 'text/html'
}

//Local functions
var serveStatic = function (response, uriToServe) {
    // Basic security - don't let a URL start navigating the filesystem
    var sanitizedURI = uriToServe.replace(/\.{2}/g, 'NO');
    var filePath = 'public' + sanitizedURI;
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

var showLobby = function (response, urlData) {
    //TODO use this space to instantiate a player object and pass it to the
    //lobby...maybe?
    serveStatic(response, '/index.html');
}

var showGame = function (response, urlData) {
    serveStatic(response, '/game.html');
}

// Export object
var Handler = {
    // For known locations, like /game/
    handle: {},
    // Could it be...static files?
    serveStatic: serveStatic
};

// Request Handler mapping split by HTTP request
// GET
Handler.handle['GET/'] = showLobby;
Handler.handle['GET/lobby'] = showLobby;
Handler.handle['GET/game'] = showGame;

// POST

exports.Handler = Handler;
