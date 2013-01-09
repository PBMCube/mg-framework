/*
 * Filename: Player.js
 * Mindgames Game Player module
 * Author: Ben Tyler
 * Date: Jan 5, 2013
 * License: Artistic License 2.0
 *
 */

// Node modules

// Mindgames libs
var ClientID = require('./utilities/ClientID.js').ClientID;

// Local vars
var playerID = '';
var currentGame = '';
var playerName = '';

// Local functions

// Export object
var Player = {};

Player.create = function (name) {
    var player = {};
    player.name = name;
    player.ID = ClientID.assignNew('player');
    player.currentGame = '';
    //here, fetch various info related to player from database
    return player;
}

exports.Player = Player;
