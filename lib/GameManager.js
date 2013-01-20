/*
 * Filename: Lobby.js
 * Mindgames Game Manager module
 * Author: Ben Tyler
 * Date: Jan 9, 2013
 * License: Artistic License 2.0
 *
 * The purpose of this module is to handle starting/stopping games. It
 * communicates to GameServer which games are running (and which players are in
 * those games) so that the appropriate messages can be forwarded. 
 *
 */

// Node modules

// Mindgames libs
var GameClass = require('./Game.js').Game;
var ClientID = require('./utilities/ClientID.js').ClientID;

// Module vars (like protected static class vars)

// Module functions (like protected static class methods)
// Class definition
var GameManager = function(app) {
    var self = {};

    //private vars
    var _games = {};
    self.newGame = function(creator, type) {
        var newGame = new Game(creator, 'rps');
    };

    self.removeGame = function(game) {
        delete _games[game.ID];
    }
    return self;
};

exports.GameManager = GameManager;
