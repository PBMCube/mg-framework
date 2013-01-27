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
var PlayerClass = require('./../shared/Player.js').PlayerClass;
var ClientID = require('./ClientID.js').ClientID;
var RouterClass = require('./../shared/Router.js').RouterClass;

// Module vars (like protected static class vars)
var moduleName = 'PlayerManager';

// Module functions (like protected static class methods)

// Class definition
var PlayerManager = function (MindgamesServer) {
    var self = RouterClass();
    self.moduleName = moduleName;
    var setPlayerName = function (name, player) {
        player.name = name;
    };
    self.routingTable = {
        'name' : setPlayerName
    };

    // Private vars
    var _players = {};
    // Public interface 
    self.register = function (ws) {
        var newPlayer = PlayerClass(ws);
        newPlayer.ID = ClientID.assignNew('player');
        MindgamesServer.send({'p':{'ID': newPlayer.ID}}, [newPlayer], null);
        _players[newPlayer.ID] = newPlayer;
        return newPlayer;
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

