


(function () {
    // Dependendices
    // Protected static variables (shared amongst instances of this class)

    // Namespace setup to allow code sharing between client and server
    var namespace;
    if (typeof require === 'undefined') {
        namespace = window.MG;
    } else {
        namespace = exports;
    }

    namespace.RouterClass = function () {
        var self = {};
        self.routingTable = {
            'unimplemented' : function () {
                console.log('Unimplemented routingTable in user of RouterClass: ' + self.moduleName);
            }
        };
        self.routeMsg = function (message, origin) {
            // Log here if there are routing-related issues. 
            for (prefix in message) {
                if (prefix in self.routingTable) {
                    self.routingTable[prefix](message[prefix], origin);
                } else {
                    if ('unimplemented' in self.routingTable) {
                        self.routingTable['unimplemented']();
                    } else {
                        console.log('unknown message routing prefix in ' + self.moduleName + ': ' + prefix);
                    }
                }
            }
        };
        return self;
    };
})();
