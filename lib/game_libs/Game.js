/*
 * Filename: Lobby.js
 * Mindgames Game  module
 * Author: Ben Tyler
 * Date: Jan 9, 2013
 * License: Artistic License 2.0
 *
 */

// Node modules

// Mindgames libs
var ClientID = require('./../utilities/ClientID.js').ClientID;

// Local vars

// Local functions

// Export object
var Game = {};
Game.players = {};

Game.create = function (owner) {
    players[owner.ID] = owner;
};

Game.addPlayer = function (playerToAdd) {
    players[playerToAdd.ID] = playerToAdd;
};

Game.removePlayer = function (playerToRemove) {

};

Game.startGame = function () {


};

Game.endGame = function () {
    var winner;
    return winner;
};

Game.getPlayers = function () {
    return players;
};

exports.Game = Game;
