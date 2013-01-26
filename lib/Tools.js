


var ArrayTools = {};
/**
 * Randomize array element order in-place.
 * Using Fisher-Yates shuffle algorithm.
 */
ArrayTools.shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};

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
exports.ArrayTools = ArrayTools;

