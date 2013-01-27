/*
 * Filename: MessageRouter.js
 * Mindgames WebSockets Message Router module
 * Author: Ben Tyler
 * Date: Jan 17, 2013
 * License: Artistic License 2.0
 *
 * The purpose of this module is to direct WS messages to the appropriate
 * places (chat messages to players in lobby, game messages to players in
 * a game, etc). This is shared between client and server.
 * 
 */

(function () {
    // This is to allow this module to live on either client or server side.
    var namespace;
    if (typeof require === 'undefined') {
        if (typeof window.MG === 'undefined') {
            window.MG = {};
        }
        namespace = window.MG;
    } else {
        namespace = exports;
    }

    namespace.MessageRouter = function (Lobby, PlayerManager, GameManager) {
        var self = {};
        var messageRouting = {
            'c' : Lobby.newMessage,  
            'g' : GameManager.newMessage,
            'p' : PlayerManager.newMessage
        };

        self.route = function (message, origin) {
            try {
                var messageObj = JSON.parse(message);
            } catch(e) {
                console.log('bad message: ' + message);
                var messageObj = {};
            } finally {
            }
            for (prefix in messageObj) {
                if (prefix in messageRouting) {
                    // Send the message to the right place. table based program flow!
                    messageRouting[prefix](messageObj[prefix], origin);
                }
            }
        };
        return self;
    };

})();
