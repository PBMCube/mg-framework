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


var RPS = require('./games/RPS.js').RPS;

var GameModules = function () {
    var self = {};

    // Register your game here.
    self['rps'] = RPS;

    return self;
};

exports.GameModules = GameModules;
