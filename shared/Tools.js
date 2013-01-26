/*
 * Filename: Tools.js
 * Mindgames Tools/utilities.
 * Author: Ben Tyler
 * Date: Jan 26, 2013
 * License: Artistic License 2.0
 *
 */

(function () {
    // This is to allow this module to live on either client or server side.
    if (typeof require === 'undefined') {
        if (typeof window.MG === 'undefined') {
            window.MG = {};
        }
        var namespace = window.MG;
    } else {
        var namespace = exports;
    }
    namespace.ArrayTools = {};
    /**
     * Randomize (well, pseudo-randomize) array element order in-place.
     * Using Fisher-Yates shuffle algorithm.
     * Thank you, Stack Overflow.
     */
    namespace.ArrayTools.shuffleArray = function (array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    };
})();
