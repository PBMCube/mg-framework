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
 * Probably it is going to end up being a general-purpose game
 * engine for web-based multiplayer games.
 *
 * It uses websockets for chat and for
 * handling gameplay interaction. Eventually it'll have things like player
 * scores/rankings etc etc.
 *
 */

var HTTPServerClass = require('./server/HTTPServer.js').Server;
var MindgamesServerClass = require('./server/MindgamesServer.js').MindgamesServer;

function Mindgames (httpServerPort, gameServerPort) {
    this.HTTPServer = HTTPServerClass(httpServerPort, this),
    this.MindgamesServer = MindgamesServerClass(gameServerPort, this)
}

//Start'r off!
Mindgames(9003, 8082);
