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
var events = require('events');

// Mindgames libs
var RPS = require('./../games/RPS.js').RPS;

// Module vars (like protected static class vars)
var gameModules = {
        'rps': RPS
}

// Module functions (like protected static class methods)

// Class definition
var Game = function(owner, type) {
    //Private vars
    var newGame = {};
    var owner = owner;
    var players = {};
    var specs = {};
    var score = {};

    var gameFrame = 0;

    // The gameMod is a rules engine for the given gametype
    var gameMod = new gameModules[type](new events.EventEmitter);

    newGame.addPlayer(owner);

    newGame.addPlayer = function(playerToAdd, ws) {
        players[playerToAdd.ID] = playerToAdd;
        score[playerToAdd.ID] = 0;
        gameMod.NewPlayer(playerToAdd);
    };

    newGame.removePlayer = function(playerToRemove) {
        delete players[playerToRemove.ID];
        gameMod.PlayerLeft(playerToRemove);
    };

    newGame.gameFrame = function () {
        gameMod.GameFrame(gameFrame);
        gameFrame++;
    };

    newGame.startGame = function() {
        setInterval(newGame.GameFrame, 30);
        gameMod.GameStart();
    };

    newGame.endGame = function() {
    };

    newGame.newRound = function() {
        gameMod.NewRound();
    };

    newGame.getPlayers = function () {
        return players;
    };
    return newGame;
}

exports.Game = Game;
