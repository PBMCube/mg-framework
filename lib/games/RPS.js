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

    this.players = 2;
    this.turnBased = false;
    this.rounds = 5;

    this.StartGame = function () {
        console.log('game started!!');
    };

    this.GameFrame = function (n) {
        console.log('game frame: ' + n);
    };

    this.PlayerJoined = function(player) {
        console.log("Hello " + player.name);
    };

    this.PlayerLeft = function(player) {
        console.log("goodbye " + player.name);
    };

    this.SpectatorJoined = function(player) {

    };

    this.SpectatorLeft = function(player) {

    };

    return this;
};

exports.RPS = RPS;

