/*
 * Filename: Mindgames.js
 * Mindgames App Entry Point
 * Author: Ben Tyler
 * Date: Jan 5, 2013
 * License: Artistic License 2.0
 *
 */


var Server = require('./lib/Server').Server;
var Lobby = require('./lib/Lobby').Lobby;

Server.start();
Lobby.start(8081);
