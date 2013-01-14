/*
 * Filename: Lobby.js
 * Mindgames Websockets Game Server module
 * Author: Ben Tyler
 * Date: Jan 9, 2013
 * License: Artistic License 2.0
 *
 * The purpose of this module is to forward WS messages to the appropriate game
 * modules and distribute messages back to players from the game: 
 * it handles input for -all- ongoing games (agnostic of what that game is).
 *
 */

// Node modules
var WebSocketServer = require('ws').Server;

// Mindgames libs
var Game = require('./game_libs/Game.js').Game;
var ClientID = require('./utilities/ClientID.js').ClientID;

// Module vars (like protected static class vars)
var Mindgames = {};

// Module functions (like protected static class methods)
function _onConnection(ws) {
    ws.on('message', onMessage);
    ws.on('close', onClose);

    ws.ID = ClientID.assignNew('gameWS');
    playersInLobby[playersInLobby.length] = ws;

    var player = Mindgames.PlayerManager.getPlayerByID(ws.ID);

    _sendToAll(player.name + ' has joined the chat.', ws.ID);

    for (var i = chatHistory.length - 10; i < chatHistory.length; i++) {
        if (typeof chatHistory[i] != 'undefined') ws.send(chatHistory[i]);
    }

    function onMessage (message) {
        _sendToGame();
    }

    function onClose () {
        Mindgames.PlayerManager.remove(ws.ID);
        playersInLobby.splice(playersInLobby.indexOf(ws), 1);
        _sendToAll(player.name + ' has left the chat', ws.ID);
    }
}

// Class definition
var GameServer = function(port, app) {
    var newGS = {};
    Mindgames = app;
    var _games = {};

    newGS.newGame = function (gameTitle) {
        var ID = ClientID.assignNew('game');
        _games[ID] = new Game(gameTitle);
    };

    //links players to their current game
    var playersGames = {};

    return newGS;
};

exports.GameServer = GameServer;
