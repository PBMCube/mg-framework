/*
 * Filename: Mindgames.js
 * Mindgames App Entry Point
 * Author: Ben Tyler
 * Date: Jan 5, 2013
 * License: Artistic License 2.0
 *
 */


var PlayerManagerClass = require('./lib/PlayerManager.js').PlayerManager;
var ServerClass = require('./lib/Server.js').Server;
var LobbyClass = require('./lib/Lobby.js').Lobby;

function app () {
    var self = this;
    this.Server = new ServerClass(9003, this),
    this.Lobby = new LobbyClass(8081, this),
    this.PlayerManager = new PlayerManagerClass(this)
}

app();


