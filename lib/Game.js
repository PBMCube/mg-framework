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
 * GameManager will instantiate Game, Now, when GameServer gets WS messages 
 * with the appropriate game ID, it will emit an event on Game. Game 
 * will parse the messages and (emit the appropriate events/trigger various
 * callbacks), which are picked up by a specific game module. The game module 
 * will update the state of the game and send the updated state of the game 
 * back to the Players in the game.
 *  
 * This class defines a library that the game modules have access to for
 * figuring out state/performing actions (like starting/stopping game, lifetime
 * of the game, the players in the game, etc etc.).
 *
 */

// Node modules
var events = require('events');

// Mindgames libs
var RPS = require('./games/RPS.js').RPS;
var ClientID = require('./utilities/ClientID.js').ClientID;

// Module vars (like protected static class vars)
var gameModules = {
        'rps': RPS
}

// Module functions (like protected static class methods)

// Class definition
var Game = function(type) {
    //Private vars
    var self = {};

    // Public vars
    self.ID = ClientID.assignNew('game');
    self.owner;
    self.gameFrame = 0;
    self.score = {};
    self.players = {};

    // The gameMod is a rules engine for the given gametype
    var gameMod = new gameModules[type](self);

    self.addPlayer = function(playerToAdd, ws) {
        players[playerToAdd.ID] = playerToAdd;
        score[playerToAdd.ID] = 0;
        gameMod.NewPlayer(playerToAdd);
    };

    self.removePlayer = function(playerToRemove) {
        delete players[playerToRemove.ID];
        gameMod.PlayerLeft(playerToRemove);
    };

    self.gameFrame = function () {
        gameMod.GameFrame(self.gameFrame);
        self.gameFrame++;
    };

    self.start = function() {
        setInterval(self.gameFrame, 30);
        gameMod.GameStart();
    };

    // Two arrays, one of winners, one of losers
    self.endGame = function(winners, losers) {
    };

    self.newRound = function() {
        gameMod.NewRound();
    };

    self.getPlayers = function () {
        return players;
    };

    return self;
}

exports.Game = Game;
