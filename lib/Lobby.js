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

// Mindgames libs
var ClientID = require('./utilities/ClientID.js').ClientID;

// Local vars
var Mindgames = {};
var playersInLobby = [];
var chatHistory = [];

// Local functions

function sendToAll(message, origin) {
    chatHistory.push(message);
    playersInLobby.forEach(function(playerSocket) {
        if (typeof playerSocket != 'undefined' && playerSocket.ID != origin) {
            playerSocket.send(message, function (e) {
                if (e) {
                    console.log('error trying to send to: ' + playerSocket.ID);
                    onError(e);   
                }
            });
        }
    });
}

function onError (e) {
    console.log(e);
}

// Export object
var Lobby = {};
Lobby.start = function (chatPort, app) {
    Mindgames = app;
    var wss = new WebSocketServer({port:chatPort}); 

    wss.on('connection', onConnection);
    wss.on('error', onError);

    function onConnection (ws) {
        ws.on('message', onMessage);
        ws.on('close', onClose);

        ws.ID = ClientID.assignNew('ws');
        playersInLobby[playersInLobby.length] = ws;

        var player = Mindgames.PlayerManager.getPlayerByID(ws.ID);

        sendToAll(player.name + ' has joined the chat.', ws.ID);

        for (var i = chatHistory.length - 10; i < chatHistory.length; i++) {
            if (typeof chatHistory[i] != 'undefined') ws.send(chatHistory[i]);
        }

        function onMessage (message) {
            sendToAll(player.name + ': ' + message, ws.ID);
        }

        function onClose () {
            Mindgames.PlayerManager.remove(ws.ID);
            playersInLobby.splice(playersInLobby.indexOf(ws), 1);
            sendToAll(player.name + ' has left the chat', ws.ID);
        }
    }
}

exports.Lobby = Lobby
