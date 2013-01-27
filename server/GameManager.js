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
var GameClass = require('./../shared/Game.js').Game;
var ClientID = require('./ClientID.js').ClientID;

// Module vars (like protected static class vars)

// Module functions (like protected static class methods)
// Class definition
var GameManager = function (MindgamesServer) {
    var self = {};

    //private vars
    var _games = {};
    self.newMessage = function (message, origin) {
        console.log('got a message for GM!');
        console.log(message);
        if (typeof message.ID == 'number') {
            _games[message.ID].newMessage(origin, message);
        } else if (message.ID === 'newGame') {
            self.newGame(origin, 'rps');
        }
    };
    self.newGame = function (creator, type) {
        var newGameID = ClientID.assignNew('game');
        var newGame = GameClass(creator, type, MindgamesServer, newGameID);
        _games[newGameID] = newGame;
    };

    self.removeGame = function (game) {
        delete _games[game.ID];
    }
    return self;
};

exports.GameManager = GameManager;
