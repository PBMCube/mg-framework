/*
 * Filename: ClientID.js
 * Mindgames ID generation 
 * Author: Ben Tyler
 * Date: Jan 26, 2013
 * License: Artistic License 2.0
 *
 */

var crypto = require('crypto');

var IDs = {};
var ClientID = {};
ClientID.assignNew = function (type) {
    if (typeof IDs[type] !== 'undefined') {
        ++IDs[type];
    } else {
        IDs[type] = 0;
    }
    // This is not super-duper-mooper cryptographically sound,
    // but for the purposes of identifying a player on a web game, it is
    // probably ok.
    var hash = crypto.createHash('sha1');
    hash.update(Math.random() + IDs[type] + '');
    return hash.digest('base64');
};

exports.ClientID = ClientID;
