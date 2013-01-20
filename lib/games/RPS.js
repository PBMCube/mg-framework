/*
 * Filename: PlayerManager.js
 * Mindgames Rock-Paper-Scissors module
 * Description: Rock paper scissors! with variable reward 
 * Author: Ben Tyler
 * Date: Jan 5, 2013
 * License: Artistic License 2.0
 *
 */

// Node modules

// Mindgames libs


var RPS = function (Game) {
    var self = {};
    self.players = 2;
    self.turnBased = false;
    self.rounds = 5;
    self.gameState = {};
    var numPlayers = 0;

    self.GameStart = function () {
        console.log('game started!!');
    };

    self.GameFrame = function (n) {
        //console.log('game frame: ' + n);
    };

    self.PlayerJoined = function(player) {
        console.log("Hello " + player.name);
        numPlayers++;
        if (numPlayers == 2) {
            Game.start();
        }
    };

    self.PlayerLeft = function(player) {
        console.log("goodbye " + player.name);
    };

    self.SpectatorJoined = function(player) {
    };

    self.SpectatorLeft = function(player) {
    };

    self.RoundStart = function() {
    };

    self.RoundEnd = function() {
    };

    return self;
};

exports.RPS = RPS;

