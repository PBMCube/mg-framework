/*
 * Filename: WSRouter.js
 * Mindgames WebSockets Message Router module
 * Author: Ben Tyler
 * Date: Jan 17, 2013
 * License: Artistic License 2.0
 *
 * The purpose of this module is to direct WS messages to the appropriate
 * places (chat messages to players in lobby, game messages to players in
 * a game, etc). 
 * 
 */

// Node modules

// Mindgames libs

// Module vars (like protected static class vars)
// Module functions (like protected static class methods)

// Class definition
var WSRouter = function (Lobby, PlayerManager, GameManager) {
    var self = {};

    var messageRouting = {
        'c' : Lobby.newMessage,  
        'g' : GameManager.newMessage,
        'p' : PlayerManager.newMessage
    };

    self.route = function (origin, message) {
        try {
            var messageObj = JSON.parse(message);
        } catch(e) {
            console.log('bad message: ' + message);
            var messageObj = {};
        } finally {
        }
        for (prefix in messageObj) {
            console.log('routing: ' + prefix);
            if (prefix in messageRouting) {
                // Send the message to the right place. table based program flow!
                messageRouting[prefix](origin, messageObj[prefix]);
            }
        }
    };
    return self;
};

exports.WSRouter = WSRouter;

