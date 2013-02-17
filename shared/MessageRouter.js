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
    // Dependencies
    var RouterClass;
    // Protected static variables (shared amongst instances of this class)
    var moduleName = 'MessageRouter';
    // Namespace setup to allow code sharing between client and server
    var namespace;
    if (typeof require === 'undefined') {
        namespace = window.MG;
        RouterClass = window.MG.RouterClass;
    } else {
        namespace = exports;
        RouterClass = require('./Router.js').RouterClass;
    }

    namespace.MessageRouter = function (Lobby, PlayerManager, GameManager) {
        var self = RouterClass();
        self.moduleName = moduleName;
        self.routingTable = {
            'c' : Lobby.routeMsg,  
            'g' : GameManager.routeMsg,
            'p' : PlayerManager.routeMsg
        };
        self.route = function (message, origin) {
            try {
                var messageObj = JSON.parse(message);
            } catch(e) {
                console.log('bad message: ' + message);
                var messageObj = {};
            } finally {
            }
            self.routeMsg(messageObj, origin);
        };
        return self;
    };

})();
