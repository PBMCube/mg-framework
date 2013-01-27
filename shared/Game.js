/*
 * Filename: Game.js
 * Mindgames Game module
 * Author: Ben Tyler
 * Date: Jan 9, 2013
 * License: Artistic License 2.0
 *
 * The purpose of this module is to be the interaction point between
 * game-specific rulesets (like rock paper scissors, Mindgames, or whatever)
 * and the rest of the app. A typical process goes like this:
 *
 * GameManager will instantiate Game, Now, when GameServer gets WS messages 
 * with the appropriate game ID, it will pass them along to that game. Game 
 * will parse the messages and call functions (call-ins, from the perspective
 * of the game modeul) in the game module, which implements the game logic.
 * The game module will update the state of the game and send the updated state 
 * of the game back to the Players in the game.
 *  
 * This class defines a library that the game modules have access to for
 * figuring out state/performing actions (like starting/stopping game, lifetime
 * of the game, the players in the game, etc etc.).
 *
 */

// Mindgames libs

// Class definition
(function () {
    // Dependencies
    var GameModules;
    // Protected static variables (shared amongst instances of this class)
    var moduleName = 'Game';
    // Namespace setup to allow code sharing between client and server
    var namespace;
    if (typeof require === 'undefined') {
        if (typeof window.MG === 'undefined') {
            window.MG = {};
        }
        namespace = window.MG;
        GameModules = window.MG.GameModules;
    } else {
        namespace = exports;
        GameModules = require('./../GameModules.js').GameModules;
    }

    namespace.Game = function(creator, type, appInterface, ID) {
        // Private vars
        var self = {};
        var players = [];
        var spectators = [];
        // The gameMod is a rules engine for the given gametype
        var gameMod = GameModules[type](self);

        // Public vars
        self.ID = ID;
        self.owner = creator;
        self.gameFrame = 0;

        // These define the call-ins that the game module can use as triggers.
        self.addPlayer = function(playerToAdd) {
            if (players.length < gameMod.numPlayers) {
                players[players.length] = playerToAdd;
                playerToAdd.currentGame = self;
                gameMod.onPlayerJoined(playerToAdd);
            } else {
                spectators[players.length] = playerToAdd;
                playerToAdd.currentGame = self;
                gameMod.onSpectatorJoined(playerToAdd);
            }

            var message = {'g':{
                ID: self.ID,
                gameType: type
            }};
            appInterface.send(message, [playerToAdd], null);
        };

        self.removePlayer = function(playerToRemove) {
            playerToRemove.currentGame = null;
            players.splice(players.indexOf(playerToRemove), 1);
            gameMod.onPlayerLeft(playerToRemove);
        };

        self.gameFrame = function () {
            gameMod.onGameFrame(self.gameFrame);
            // An update interval of < 0 indicates that the game is going to
            // broadcast updates just when it needs to. This is more suitable for
            // turn-based or fairly slow games (or if bandwidth is a concern).
            if (gameMod.updateInterval > 0 && self.gameFrame % gameMod.updateInterval === 0) {
                self.send(gameMod.gameState, players.concat(spectators));
            }
            self.gameFrame++;
        };

        self.start = function() {
            // 33 game frames per second
            setInterval(self.gameFrame, 30);
            gameMod.onGameStart();
        };

        self.playerMessage = function (message, player) {
            gameMod.onPlayerMessage(message, player.ID);
        };

        // These are methods that the module can use to interact with the rest of
        // the app.

        self.send = function (message) {
            var message = {'g': message};
            appInterface.send(message, players.concat(spectators), null);
        };

        // Two arrays, one of winners, one of losers
        self.endGame = function(winners, losers) {
            gameMod.onGameEnd();
        };

        console.log('created a new game!');

        self.addPlayer(creator);
        return self;
    };
})();
