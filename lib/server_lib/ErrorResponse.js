/*
 * Filename: ErrorResponse.js
 * Mindgames HTTP Error Response module
 * Author: Ben Tyler
 * Date: Jan 5, 2013
 * License: Artistic License 2.0
 *
 */

//Node modules

//Mindgames libs

// Local vars
var errorResponseMessage = {
    404: "Ain't no such thing.",
    405: "I'm afraid I can't do that for you."
}

// Local functions
function show(response, errorCode) {
    response.writeHead(errorCode, {'Content-Type': 'text/plain'});
    if (errorCode in errorResponseMessage) {
        response.write(errorCode + " - " + errorResponseMessage[errorCode]);
    } else {
        console.log('Unexpected Error Code: ' + errorCode);
    }
    response.end();
}

//Export object
var ErrorResponse = {};
ErrorResponse.show = show;

exports.ErrorResponse = ErrorResponse;
