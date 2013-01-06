/*
 * Filename: Lobby.js
 * Mindgames WebSockets Chat Lobby module
 * Author: Ben Tyler
 * Date: Jan 5, 2013
 * License: Artistic License 2.0
 *
 */

// Node modules
var WebSocketServer = require('ws').Server;

// Mindgames modules
var Player = require('./Player');

//Local vars
var playersInLobby = [];
var ongoingGames = [];

//Local functions

// Export object
var Lobby = {};
Lobby.start = function (chatPort) {
    var chatHistory = [];
    var wss = new WebSocketServer({port:chatPort}); 

    wss.on('connection', onConnection);
    wss.on('error', onError);

    function onConnection (ws) {
        ws.on('message', onMessage);
        ws.on('close', onClose);

        sendToAll('A trap has been sprung!');

        ws.clientID = playersInLobby.push(ws) - 1;
        for (var i = chatHistory.length - 10; i < chatHistory.length; i++) {
            if (chatHistory[i] !== undefined) ws.send(chatHistory[i]);
        }

        function onMessage (message) {
            chatHistory.push(message);
            sendToAll(message);
        }

        function onClose () {
            playersInLobby.splice(ws.clientID, 1);
            sendToAll('Somebody has left the chat');
        }
    }

    function sendToAll(message) {
        playersInLobby.forEach(function(playerSocket) {
            if (playerSocket != undefined) {
                playerSocket.send(message);
            }
        });
    }

    function onError () {
        console.log('boom!');
    }
}

exports.Lobby = Lobby
