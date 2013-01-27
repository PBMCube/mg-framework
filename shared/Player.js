/*
 * Filename: Player.js
 * Mindgames Game Player module
 * Author: Ben Tyler
 * Date: Jan 5, 2013
 * License: Artistic License 2.0
 *
 * The purpose of this module is to be the representation of a player in the
 * app. It keeps track of ID, the player's currently ongoing game, name, and
 * other info.
 *
 */

(function () {
    // Dependencies
    // Protected static variables (shared amongst instances of this class)
    var moduleName = 'Player';
    // Namespace setup to allow code sharing between client and server
    var namespace;
    if (typeof require === 'undefined') {
        if (typeof window.MG === 'undefined') {
            window.MG = {};
        }
        namespace = window.MG;
    } else {
        namespace = exports;
    }

    namespace.PlayerClass = function (ws) {
        //private vars
        var self = {};
        //public facing
        self.name = null;
        self.socket = ws;
        self.ID = null;
        self.currentGame = null;
        return self;
    };
})();
