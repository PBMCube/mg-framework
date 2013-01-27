


(function () {
    // Dependendices
    // Protected static variables (shared amongst instances of this class)

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

    namespace.RouterClass = function () {
        var self = {};
        self.routeMsg = function (message, origin) {
            for (prefix in message) {
                if (prefix in self.routingTable) {
                    self.routingTable[prefix](message[prefix], origin);
                } else {
                    console.log('unknown message prefix in ' + self.moduleName + ': ' + prefix);
                }
            }
        };
        return self;
    };
})();
