/*
 * Filename: PlayerManager.js
 * Mindgames Game Player Manager module
 * Author: Ben Tyler
 * Date: Jan 5, 2013
 * License: Artistic License 2.0
 *
 * The purpose of this module is to keep track of the players who are currently
 * in the app: registering newly joined players, removing them on quit, etc. It
 * allows other objects to grab a particular player by ID.
 *
 */

// Node modules

// Mindgames libs
var PlayerClass = require('./Player.js').Player;

// Module vars (like protected static class vars)

// Module functions (like protected static class methods)

// Class definition
var PlayerManager = function () {
    var self = {};

    // Private vars
    var _players = {};
    var internalRouting = {
        'name': self.setPlayerName
    }

    // Public interface 
    self.register = function (ws) {
        var newPlayer = new PlayerClass(ws);
        _players[newPlayer.ID] = newPlayer;
        return newPlayer.ID;
    };

    self.newMessage = function (origin, message) {
        console.log('PM got a message');
        console.log(origin, message);
    };

    self.remove = function (ID) {
        delete _players[ID];
    };

    self.getPlayerByID = function (ID) {
        return _players[ID];
    };

    return self;
}

exports.PlayerManager = PlayerManager;

