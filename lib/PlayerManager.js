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
var PlayerClass = require('./game_libs/Player.js').Player;

// Local vars
var numPlayers = 0;
var players = {};

// Local functions

// public interface 
var PlayerManager = function (app) {
    this.app = app;
    var self = this;

    this.register = function (name) {
        numPlayers++;
        var newPlayer = new PlayerClass(name);
        players[newPlayer.ID] = newPlayer;
    };

    this.remove = function (ID) {
        delete players[ID];
        numPlayers = numPlayers - 1;
    };

    this.getPlayerByID = function (ID) {
        return players[ID];
    };

    return this;
}

exports.PlayerManager = PlayerManager;

