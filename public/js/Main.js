(function () {
    var MG = window.MG;

    var self = {};
    var ws = new WebSocket('ws://' + document.domain + ':8082');

    self.Player = MG.PlayerClass(ws);
    self.Chat = MG.ChatClass(self);
    self.GameManager = MG.RouterClass();
    self.GameManager.routingTable = {'g': function(msg) {console.log(msg);}};
    self.GameManager.moduleName = 'GameManager';
    self.PlayerHandler = MG.RouterClass();
    self.PlayerHandler.routingTable = {
        'p': function(msg) {console.log(msg);},
        'ID': function(msg) {self.Player.ID = msg; console.log(self.Player.ID);}
    };
    self.PlayerHandler.moduleName = 'PlayerHandler';

    var messageRouter = MG.MessageRouter(self.Chat, self.PlayerHandler, self.GameManager);

    var url = window.location.toString();
    self.Player.name = parseQueryString(url)['user-name'];

    self.send = function (messageObj, to, from) {
        // the To/From elements are required for the interface server-side, but
        // since we're sending from the client, messages are always from us to
        // the server. Therefore, they are ignored here.
        var message = JSON.stringify(messageObj);
        console.log(message);
        ws.send(message);
    };

    ws.onopen = function () {
        self.send({'p': {'name':self.Player.name}});
        self.send({'c': {'join':true}});
    };

    ws.onmessage = function (e) {
        messageRouter.route(e.data);
    };
    ws.onerror = function (error) {
        console.log('Websocketz errorz! ' + error);
    };


    var queryStringObj  = parseQueryString(window.location.toString());

    var gameLink = document.getElementById('newGame');
    gameLink.addEventListener('click', function (e) { 
        var messageObj = {'g': {ID:'newGame'}};
        self.send(messageObj);
    });

    function parseQueryString(url) {
        var result = {};
        var params = url.split("?")[1].split("&");
        for (var index in params) {
            var paramKeyValue = params[index].split("=");
            result[paramKeyValue[0]] = paramKeyValue[1];
        }
        return result;
    }

})();
