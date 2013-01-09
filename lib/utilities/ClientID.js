/*
 * Filename: ClientID.js
 * Mindgames ID assignment module
 * Author: Ben Tyler
 * Date: Jan 5, 2013
 * License: Artistic License 2.0
 *
 */

// Node modules

// Mindgames libs

// Local vars
//One ID counter per object type
var IDs = {};


// Local functions

// Export object
var ClientID = {};

ClientID.assignNew = function (type) {
    if (typeof IDs[type] !== 'undefined') {
        return ++IDs[type];
    } else {
        IDs[type] = 0;
        return 0;
    }
}

exports.ClientID = ClientID;


