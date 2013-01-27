/*
 * Filename: Tools.js
 * Mindgames Tools/utilities.
 * Author: Ben Tyler
 * Date: Jan 26, 2013
 * License: Artistic License 2.0
 *
 */

(function () {
    // Dependendices
    // Protected static variables (shared amongst instances of this class)
    var moduleName = 'ArrayTools';

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
