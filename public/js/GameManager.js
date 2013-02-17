(function () {
    window.MG.GameManagerClass = function () {
        var self = MG.RouterClass();
        self.routingTable = {'g': function(msg) {console.log(msg);}};
        self.moduleName = 'GameManager';
        return self;
    };
})();

