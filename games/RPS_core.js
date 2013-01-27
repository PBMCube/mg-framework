/*
 * Filename: RPS_core.js
 * Mindgames Rock-Paper-Scissors module
 * Description: Rock paper scissors! with variable reward 
 * Author: Ben Tyler
 * Date: Jan 5, 2013
 * License: Artistic License 2.0
 *
 */

(function () {
    // This is to allow this module to live on either client or server side.
    if (typeof require === 'undefined') {
        if (typeof window.MG === 'undefined') {
            window.MG = {};
        }
        var ArrayTools = window.MG.ArrayTools;
        var namespace = window.MG;
    } else {
        var ArrayTools = require('./../shared/Tools.js').ArrayTools;
        var namespace = exports;
    }

    namespace.RPS = function (Game) {
        var self = {};
        self.name = 'RPS';

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

        var pointValues = [25, 15, 5];

        self.onGameStart = function () {
            ArrayTools.shuffle(pointValues);
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

        self.onPlayerJoined = function (player) {
            console.log("Hello " + player.name);
            players.ingamePlayers++;
            players[player.ID] = {
                score: 0
            };
            if (players.ingamePlayers == 2) {
                Game.start();
            }
        };

        self.onPlayerLeft = function (player) {
            console.log("goodbye " + player.name);
        };

        self.onSpectatorJoined = function (player) {
        };

        self.onSpectatorLeft = function (player) {
        };

        self.onPlayerMessage = function (message, playerID) {
        };

        return self;
    };
})();
