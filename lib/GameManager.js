/*
 * Filename: Lobby.js
 * Mindgames Game Manager module
 * Author: Ben Tyler
 * Date: Jan 9, 2013
 * License: Artistic License 2.0
 *
 */

// Node modules

// Mindgames libs
var GameClass = require('./game_libs/Game.js').Game;
var ClientID = require('./utilities/ClientID.js').ClientID;

// Local vars
var Mindgames = {};
var games = {};

// Local functions

// Export object
var GameManager = function(app) {
    var self = this;
    Mindgames = app;

    this.newGame = function (creator) {

    };
    return this;
};

exports.GameManager = GameManager;
