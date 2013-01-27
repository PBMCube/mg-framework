/*
 * Filename: GameModules.js
 * Mindgames Interface for getting game-specific rulesets
 * Author: Ben Tyler
 * Date: Jan 25, 2013
 * License: Artistic License 2.0
 *
 * The purpose of this module is to serve as a collection of game modules that
 * the Game library can use as rules engines.
 *
 */

(function () {
    // Dependencies
    var RPS;
    // This is to allow this module to live on either client or server side.
    var namespace;
    if (typeof require === 'undefined') {
        if (typeof window.MG === 'undefined') {
            window.MG = {};
        }
        RPS = window.MG.RPS;
        namespace = window.MG;
    } else {
        RPS = require('./games/RPS_core.js').RPS;
        namespace = exports;
    }

    namespace.GameModules = {};

    // Register games here.
    namespace.GameModules['rps'] = RPS;
})();
