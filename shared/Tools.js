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
    var moduleName = 'Tools';

    // Namespace setup to allow code sharing between client and server 
    var namespace;
    if (typeof require === 'undefined') {
        namespace = window.MG;
    } else {
        namespace = exports;
    }
    namespace.Tools = {};
    /**
     * Randomize (well, pseudo-randomize) array element order in-place.
     * Using Fisher-Yates shuffle algorithm.
     * Thank you, Stack Overflow.
     */
    namespace.Tools.shuffleArray = function (array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    };

    namespace.Tools.parseQueryString = function (url) {
        var result = {};
        var params = url.split("?")[1].split("&");
        for (var index in params) {
            var paramKeyValue = params[index].split("=");
            result[paramKeyValue[0]] = paramKeyValue[1];
        }
        return result;
    };

})();
