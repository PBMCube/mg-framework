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
var PlayerManager = function (MindgamesServer) {
    var self = {};
    var setPlayerName = function (player, name) {
        player.name = name;
    };

    // Private vars
    var _players = {};
    var internalRouting = {
        'name' : setPlayerName
    };

    // Public interface 
    self.register = function (ws) {
        var newPlayer = new PlayerClass(ws);
        MindgamesServer.send([newPlayer], null, {'p':{'ID': newPlayer.ID}});
        _players[newPlayer.ID] = newPlayer;
        return newPlayer;
    };

    self.newMessage = function (origin, message) {
        for (prefix in message) {
            if (prefix in internalRouting) {
                internalRouting[prefix](origin, message[prefix]);
            } else {
                console.log('unknown message prefix in PlayerManager: ' + prefix);
            }
        }
    };


    self.remove = function (player) {
        player.socket = '';
        delete _players[player.ID];
    };

    self.getPlayerByID = function (ID) {
        return _players[ID];
    };

    return self;
}

exports.PlayerManager = PlayerManager;

