(function () {
    MG.PlayerHandlerClass = function (player) {
        var self = MG.RouterClass();
        self.routingTable = {
            'p': function (msg) {},
            'ID': function (msg) {player.ID = msg;}
        };
        self.moduleName = 'PlayerHandler';
        return self;
    };
})();

