/*
 * Filename: GameManager.js
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
var GameClass = require('./../shared/Game.js').Game;
var ClientID = require('./ClientID.js').ClientID;
var RouterClass = require('./../shared/Router.js').RouterClass;

// Module vars (like protected static class vars)
var moduleName = 'GameManager';

// Module functions (like protected static class methods)
// Class definition
var GameManager = function (MindgamesServer) {
    var self = RouterClass();
    self.moduleName = moduleName;

    self.routingTable = {
        'game': function (message, origin) {},
        'new': newGame,
        'end': removeGame
    };

    //private vars
    var _games = {};

    function newGame (type, creator) {
        var newGameID = ClientID.assignNew('game');
        var newGame = GameClass(creator, type, MindgamesServer, newGameID);
        _games[newGameID] = newGame;
    };

    function removeGame (game) {
        delete _games[game.ID];
    }

    return self;
};

exports.GameManager = GameManager;
