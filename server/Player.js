/*
 * Filename: Player.js
 * Mindgames Game Player module
 * Author: Ben Tyler
 * Date: Jan 5, 2013
 * License: Artistic License 2.0
 *
 * The purpose of this module is to be the representation of a player in the
 * app. It keeps track of ID, the player's currently ongoing game, name, and
 * other info.
 *
 */

// Node modules

// Mindgames libs
var ClientID = require('./ClientID.js').ClientID;
// Module vars (like protected static class vars)

// Module functions (like protected static class methods)

// Class definition
function Player (ws) {
    //private vars
    var self = {};
    //public facing
    self.name = null;
    self.socket = ws;
    self.ID = ClientID.assignNew('player');
    self.currentGame = null;
    return self;
};

exports.Player = Player;
