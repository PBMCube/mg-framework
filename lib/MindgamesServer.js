/*
 * Filename: MindgamesServer.js
 * Mindgames WebSockets Server module
 * Author: Ben Tyler
 * Date: Jan 17, 2013
 * License: Artistic License 2.0
 *
 * The purpose of this module is to handle WebSockets connections/messages and route
 * them to the appropriate location (game or chat).
 * 
 */

// Node modules
var WebSocketServer = require('ws').Server;

// Mindgames libs
var ClientID = require('./utilities/ClientID.js').ClientID;
var WSRouter = require('./server_lib/WSRouter.js').WSRouter;

var LobbyClass = require('./Lobby.js').Lobby,
    PlayerManagerClass = require('./PlayerManager.js').PlayerManager,
    GameManagerClass = require('./GameManager.js').GameManager;

// Module vars (like protected static class vars)
var Mindgames = {};

// Module functions (like protected static class methods)
var MindgamesServer = function(wsport, app) {
    var self = {};
    var wss = new WebSocketServer({port:wsport}); 
    self.Lobby = new LobbyClass(self);
    self.PlayerManager = new PlayerManagerClass(self);
    self.GameManager = new GameManagerClass(self);

    var wsRouter = new WSRouter(self.Lobby, self.PlayerManager, self.GameManager);

    // Lobby/game uses this to send messages back out to players
    // to: array of player IDs to send to
    // message: object with data to be JSON-ified and sent
    self.send = function (to, from, message) {
        var msgText = JSON.stringify(message);
        console.log('mindgames send!: ' + msgText);
        to.forEach(function (destination) {
            destination.socket.send(msgText);
        });
    };

    //WebSocketServer event handlers
    wss.on('connection', function(ws) {
        // Messages for the message router~!
        // Register the player
        var playerID = self.PlayerManager.register(ws);
        ws.ID = playerID;

        ws.on('message', function (message) {
            wsRouter.route(ws.ID, message);
        });
        ws.on('close', function () {
            self.PlayerManager.remove(playerID)
        });
    });

    wss.on('error', function (e) {
        console.log(e);
    });

    return self;
};

exports.MindgamesServer = MindgamesServer;
