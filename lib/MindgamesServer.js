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

// Node/npm modules
var WebSocketServer = require('ws').Server;

// Mindgames libs
var ClientID = require('./Tools.js').ClientID,
    WSRouter = require('./server_lib/WSRouter.js').WSRouter,
    LobbyClass = require('./Lobby.js').Lobby,
    PlayerManagerClass = require('./PlayerManager.js').PlayerManager,
    GameManagerClass = require('./GameManager.js').GameManager;

// Module vars (like protected static class vars)

// Module functions (like protected static class methods)
var MindgamesServer = function(wsport, app) {
    var self = {};
    var wss = new WebSocketServer({port:wsport}); 
    self.Lobby = LobbyClass(self);
    self.PlayerManager = PlayerManagerClass(self);
    self.GameManager = GameManagerClass(self);

    var wsRouter = WSRouter(self.Lobby, self.PlayerManager, self.GameManager);

    // Lobby/game uses this to send messages back out to players
    // to: array of players to send to
    // from: player object that message is coming from
    // message: object with data to be JSON-ified and sent
    self.send = function (to, from, message) {
        // A server message
        if (from === null) {
            from = {ID:-1};
        }
        var msgText = JSON.stringify(message);
        console.log("message: " + msgText);
        if (typeof msgText === undefined) {
            console.log(message);
        }
        to.forEach(function (destination) {
            console.log(destination.ID + " -- " + from.ID);
            if (destination !== from) {
                console.log('sending message to: ' + destination.ID);
                destination.socket.send(msgText);
            } 
        });
    };

    //WebSocketServer event handlers
    wss.on('connection', function(ws) {
        var player = self.PlayerManager.register(ws);

        // Messages for the message router~!
        ws.on('message', function (message) {
            wsRouter.route(player, message);
        });

        ws.on('close', function () {
            self.Lobby.playerLeft(player);
            self.PlayerManager.remove(player)
        });
    });

    wss.on('error', function (e) {
        console.log(e);
    });

    return self;
};

exports.MindgamesServer = MindgamesServer;
