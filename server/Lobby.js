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

// Module vars (like protected static class vars)
var Mindgames = {};
var playersInLobby = [];
var chatHistory = [];
var chatHistLimit = 15;

// Module functions (like protected static class methods)

// Class definition
var Lobby = function (MindgamesServer) {
    var self = {};
    var playersInLobby = [];

    self.newMessage = function (message, origin) {
        if (message === true) {
            self.playerJoined(origin);
        } else if (message === false) {
            self.playerLeft(origin);
        } else {
            chatSend(message, origin);
        }
    };

    self.playerJoined = function (player) {
        playersInLobby[playersInLobby.length] = player;
        MindgamesServer.send({'c':chatHistory}, [player], null);
        var name = (typeof player.name) === 'undefined' ? "Unnamed Player" : player.name;
        chatSend("joined the chat.", player);
    };

    self.playerLeft = function (player) {
        playersInLobby.splice(playersInLobby.indexOf(player), 1);
        chatSend(player.name + " left the chat.", player);
    };

    function chatSend(message, origin) {
        var dateObj = new Date();
        var completeMessage = "[" + dateObj.toTimeString().substring(0, 8) + "] " + origin.name + ": " + message;
        chatHistory.push(completeMessage);
        var wsMessage = {'c': completeMessage};
        // null is for message from the server
        MindgamesServer.send(wsMessage, playersInLobby, null);
    }
    return self;
};

exports.Lobby = Lobby;
