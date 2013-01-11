/*
 * Filename: Game.js
 * Mindgames Game module
 * Author: Ben Tyler
 * Date: Jan 9, 2013
 * License: Artistic License 2.0
 *
 * The purpose of this module is to be the interaction point between
 * game-specific rulesets (like rock paper scissors, Mindgames, or whatever)
 * and the rest of the app. A typical process goes like this:
 *
 * GameManager will instantiate Game, then tell GameServer about 
 * the players in it. Now, when GameServer gets WS messages with the appropriate
 * game ID, it will emit an event on Game. Game will parse the messages and
 * (emit the appropriate events/trigger various callbacks), which are picked up by 
 * a specific game module. The game module will update the state of the game and 
 * send the updated state of the game back to the Players in the game
 *
 *
 */

// Node modules

// Mindgames libs
var RPS = require('./../games/RPS.js').RPS;

// Module vars (like protected static class vars)
var gameModules = {
        'rps': RPS
}

// Module functions (like protected static class methods)

// Class definition
var Game = function (owner, type) {
    //Private vars
    var owner = owner;
    var _players = {};
    var _specs = {};

    // The gameMod is a rules engine for the given gametype
    var gameMod = new gameModules[type]();

    this.addPlayer(owner);

    //Public interface
    this.addPlayer = function (playerToAdd) {
        _players[playerToAdd.ID] = playerToAdd;
    };

    this.removePlayer = function (playerToRemoveID) {
        delete _players[playerToRemove.ID];
    };

    this.startGame = function () {
        for (var player in _players) {
            gameMod.msgHandlers[player.getID]
            this.on(player.getID() + 'msg', 

        }
    };

    this.endGame = function () {
    };

    this.getPlayers = function () {
        return players;
    };
    return this;
}

exports.Game = Game;
