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
var ClientID = require('./../utilities/ClientID.js').ClientID;

// Local vars

// Local functions

// Export object
function Player (name) {
    this.name = name;
    this.ID = ClientID.assignNew('player');
    this.currentGame = '';
    //here, fetch various info related to player from database
    return this;
};

exports.Player = Player;
