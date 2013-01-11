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
var GameClass = require('./game_libs/Game.js').Game;
var ClientID = require('./utilities/ClientID.js').ClientID;

// Module vars (like protected static class vars)

// Module functions (like protected static class methods)

// Class definition
var GameManager = function(app) {
    var self = this;
    this.app = app;
    var _games = {};

    this.newGame = function (creator) {
        var gameID = ClientID.assignNew('game');
        var newGame = new Game(creator, 'rps');
    };
    return this;
};

exports.GameManager = GameManager;
