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
var PlayerClass = require('./game_libs/Player.js').Player;

// Module vars (like protected static class vars)
var numPlayers = 0;

// Module functions (like protected static class methods)

// Class definition
var PlayerManager = function (app) {
    var newPM = {};
    newPM.app = app;
    var self = newPM;

    // Private vars
    var _players = {};

    // Public interface 
    newPM.register = function (name) {
        numPlayers++;
        var newPlayer = new PlayerClass(name);
        _players[newPlayer.ID] = newPlayer;
    };

    newPM.remove = function (ID) {
        delete _players[ID];
        numPlayers = numPlayers - 1;
    };

    newPM.getPlayerByID = function (ID) {
        return _players[ID];
    };

    return newPM;
}

exports.PlayerManager = PlayerManager;

