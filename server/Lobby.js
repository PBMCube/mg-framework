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
var RouterClass = require('./../shared/Router.js').RouterClass;

// Module vars (like protected static class vars)
var moduleName = 'Lobby';
var playersInLobby = [];
var chatHistory = [];
var chatHistLimit = 15;

// Module functions (like protected static class methods)

// Class definition
var Lobby = function (MindgamesServer) {
    var self = RouterClass();
    self.moduleName = moduleName;
    var playersInLobby = [];

    self.routingTable = {
        'join' : playerJoined,
        'msg'  : chatSend
    };

    self.removePlayer = function(player) {
        playersInLobby.splice(playersInLobby.indexOf(player), 1);
        chatSend(player.name + " left the chat.", player);
    };

    function playerJoined (message, player) {
        console.log(player.name + " joined the chat");
        playersInLobby[playersInLobby.length] = player;
        MindgamesServer.send({'c':{'msg':chatHistory}}, [player], null);
        var name = (typeof player.name) === 'undefined' ? "Unnamed Player" : player.name;
        chatSend("joined the chat.", player);
    };

    function chatSend(message, origin) {
        var dateObj = new Date();
        var completeMessage = "[" + dateObj.toTimeString().substring(0, 8) + "] " + origin.name + ": " + message;
        chatHistory.push(completeMessage);
        var wsMessage = {'c': {'msg': completeMessage}};
        // null is for message from the server
        MindgamesServer.send(wsMessage, playersInLobby, null);
    }
    return self;
};

exports.Lobby = Lobby;
