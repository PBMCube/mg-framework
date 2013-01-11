/*
 * Filename: Mindgames.js
 * Mindgames App Entry Point
 * Author: Ben Tyler
 * Date: Jan 5, 2013
 * License: Artistic License 2.0
 *
 * This app is meant to be a platform for Mindgames, a game design by Carleton
 * College GameDev 2011, originally implemented as a RTS using the Spring engine.
 *
 * It uses websockets for chat and for
 * handling gameplay interaction. Eventually it'll have things like player
 * scores/rankings etc etc.
 *
 */

var PlayerManagerClass = require('./lib/PlayerManager.js').PlayerManager;
var ServerClass = require('./lib/Server.js').Server;
var LobbyClass = require('./lib/Lobby.js').Lobby;
var GameServerClass = require('./lib/GameServer.js').GameServer;

function Mindgames (serverPort, lobbyPort, gameServerPort) {
    this.Server = new ServerClass(serverPort, this),
    this.Lobby = new LobbyClass(lobbyPort, this),
    this.PlayerManager = new PlayerManagerClass(this),
    this.GameServer = new GameServerClass(gameServerPort, this)
}

//Start'r off!
Mindgames(9003, 8081, 8082);
