/*
 * Filename: PlayerManager.js
 * Mindgames Game Player Manager module
 * Description: Keeps track of players, handles registering them, etc
 * Author: Ben Tyler
 * Date: Jan 5, 2013
 * License: Artistic License 2.0
 *
 */

// Node modules
//REDIS STUFF HERE

// Mindgames libs
var Player = require('./Player.js').Player;
var ClientID = require('./utilities/ClientID.js').ClientID;

// Local vars
var Mindgames = {};
var numPlayers = 0;

// Local functions

// Export object
var PlayerManager = {};

PlayerManager.players = {};
PlayerManager.init = function (app) {
    Mindgames = app;
}

PlayerManager.register = function (name) {
    numPlayers++;
    var newPlayer = Player.create(name);
    PlayerManager.players[newPlayer.ID] = newPlayer;
}

PlayerManager.remove = function (ID) {
    delete PlayerManager.players[ID];
    numPlayers = numPlayers - 1;
}

PlayerManager.getPlayerByID = function (ID) {
    return PlayerManager.players[ID];
}

exports.PlayerManager = PlayerManager;

