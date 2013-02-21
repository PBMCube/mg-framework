(function () {
    // This is admittedly a bit overengineered, but I think the 
    // server/client symmetry is worth it (and its at least possible that
    // someone might be playing more than one game at once).
    MG.GameManagerClass = function () {
        var self = MG.RouterClass();
        self._games = {};
        self.routingTable = {
            'game'  : function (msg) {console.log('game' + msg);},
            'new'   : function (msg) {console.log('new' + msg);},
            'end'   : function (msg) {console.log('end' + msg);}
        };

        function newGame (msg) {

        }

        function removeGame (msg) {

        }


        self.moduleName = 'GameManager';
        return self;
    };
})();

