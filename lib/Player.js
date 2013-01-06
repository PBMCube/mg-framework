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

//Local vars
var ID = '';
var currentGame = '';
var name = '';

//Local functions

//Export object
var Player = {};
Player.new = function (ID, name) {

}

Player.getID = function () {
    return ID;
}

Player.getCurrentGame = function () {
    return currentGame;
}


exports.Player = Player;
