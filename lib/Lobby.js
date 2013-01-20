/*
 * Filename: Lobby.js
 * Mindgames WebSockets Chat Lobby module
 * Author: Ben Tyler
 * Date: Jan 5, 2013
 * License: Artistic License 2.0
 *
 * The purpose of this module is to provide a simple web chat, to serve as
 * the player lobby from which players can create or join games. 
 * 
 */

// Node modules
var WebSocketServer = require('ws').Server,
    events          = require('events'),
    util            = require('util');

// Mindgames libs
var ClientID = require('./utilities/ClientID.js').ClientID;

// Module vars (like protected static class vars)
var Mindgames = {};
var playersInLobby = [];
var chatHistory = [];
var chatHistLimit = 15;

// Module functions (like protected static class methods)

var Lobby = function(MindgamesServer) {
    var self = {};
    var playersInLobby = [];

    self.newMessage = function (originID, message) {
        var origin = MindgamesServer.PlayerManager.getPlayerByID(originID);
        console.log('lobby got a message');
        console.log(originID, message);
        if (message === true) {
            self.playerJoined(origin);
        } else if (message === false) {
            self.playerLeft(origin);
        } else {
            chatSend(origin, message);
        }
    };

    self.playerJoined = function (player) {
        playersInLobby[playersInLobby.length] = player;
        MindgamesServer.send([player], {'c':chatHistory});
        var name = typeof player.name === undefined ? "Unnamed Player" : player.name;
        chatSend(player, player.name + " joined the chat.");
    };

    self.playerLeft = function (player) {
        playersInLobby.splice(playersInLobby.indexOf(player), 1);
        chatSend(player, player.name + " left the chat.");
    };

    function chatSend(origin, message) {
        chatHistory.push(message);
        var wsMessage = {'c':message};
        MindgamesServer.send(playersInLobby, origin, wsMessage);
    }
    return self;
};

exports.Lobby = Lobby;
