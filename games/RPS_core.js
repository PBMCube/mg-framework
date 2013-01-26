/*
 * Filename: PlayerManager.js
 * Mindgames Rock-Paper-Scissors module
 * Description: Rock paper scissors! with variable reward 
 * Author: Ben Tyler
 * Date: Jan 5, 2013
 * License: Artistic License 2.0
 *
 */

var ArrayTools = require('./../lib/Tools.js').ArrayTools;

var RPS = function (Game) {
    var self = {};

    // These vars describe attributes of the game.
    // Update interval measured in multiples of 33 frames per second. If
    // negative, updates are only broadcast with explicit Game.send
    // calls.
    self.updateInterval = -1;
    self.gameState = {};

    var rounds = 5;
    var numPlayers = 2;
    var players = {
        ingamePlayers: 0
    };

    self.onGameStart = function () {
        var pointValues = ArrayTools.shuffle([25, 15, 5]);
        self.gameState['round'] = 0;
        self.gameState['player1move'] = '';
        self.gameState['player2move'] = '';
        Game.RoundStart();
        Game.send('start');
        console.log('game started!!');
    };

    self.onGameFrame = function (n) {
        //console.log('game frame: ' + n);
    };

    self.onPlayerJoined = function(player) {
        console.log("Hello " + player.name);
        players.ingamePlayers++;
        players[player.ID] = {
            score: 0
        };
        if (players.ingamePlayers == 2) {
            Game.start();
        }
    };

    self.onPlayerLeft = function(player) {
        console.log("goodbye " + player.name);
    };

    self.onSpectatorJoined = function(player) {
    };

    self.onSpectatorLeft = function(player) {
    };

    return self;
};

exports.RPS = RPS;

