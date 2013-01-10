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

// Private methods

function _sendToAll(message, origin) {
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

function _onError (e) {
    console.log(e);
}

function _onConnection (ws) {
    ws.on('message', onMessage);
    ws.on('close', onClose);

    ws.ID = ClientID.assignNew('ws');
    playersInLobby[playersInLobby.length] = ws;

    var player = Mindgames.PlayerManager.getPlayerByID(ws.ID);

    _sendToAll(player.name + ' has joined the chat.', ws.ID);

    for (var i = chatHistory.length - 10; i < chatHistory.length; i++) {
        if (typeof chatHistory[i] != 'undefined') ws.send(chatHistory[i]);
    }

    function onMessage (message) {
        _sendToAll(player.name + ': ' + message, ws.ID);
    }

    function onClose () {
        Mindgames.PlayerManager.remove(ws.ID);
        playersInLobby.splice(playersInLobby.indexOf(ws), 1);
        _sendToAll(player.name + ' has left the chat', ws.ID);
    }
}

// Public interface
var Lobby = function(chatPort, app) {
    var self = this;
    this.app = app;
    Mindgames = app;
    var wss = new WebSocketServer({port:chatPort}); 

    wss.on('connection', _onConnection);
    wss.on('error', _onError);

    return this;
};

exports.Lobby = Lobby;
