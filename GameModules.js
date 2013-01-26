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


var RPS = require('./games/RPS_core.js').RPS;

var GameModules = {};

// Register games here.
GameModules['rps'] = RPS;

exports.GameModules = GameModules;
