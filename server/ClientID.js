/*
 * Filename: ClientID.js
 * Mindgames ID generation 
 * Author: Ben Tyler
 * Date: Jan 26, 2013
 * License: Artistic License 2.0
 *
 */

var IDs = {};
var ClientID = {};
ClientID.assignNew = function (type) {
    if (typeof IDs[type] !== 'undefined') {
        return ++IDs[type];
    } else {
        IDs[type] = 0;
        return 0;
    }
};

exports.ClientID = ClientID;
