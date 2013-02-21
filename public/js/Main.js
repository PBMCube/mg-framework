(function () {
    var MG = window.MG;

    var self = {};
    var ws = new WebSocket('ws://' + document.domain + ':8082');

    self.Player = MG.PlayerClass(ws);
    self.Chat = MG.ChatClass(self);
    self.PlayerHandler = MG.PlayerHandlerClass(self.Player);
    self.GameManager = MG.GameManagerClass();

    var components = {
        'c':self.Chat,
        'p':self.PlayerHandler,
        'g':self.GameManager
    };

    var messageRouter = MG.MessageRouter(components);

    var url = window.location.toString();
    self.Player.name = MG.Tools.parseQueryString(url)['user-name'];

    self.send = function (messageObj, to, from) {
        // the To/From elements are required for the interface server-side, but
        // since we're sending from the client, messages are always from us to
        // the server. Therefore, they are ignored here.
        var message = JSON.stringify(messageObj);
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

    var gameLink = document.getElementById('newGame');
    gameLink.addEventListener('click', function (e) { 
        var messageObj = {'g': {'new':'rps'}};
        self.send(messageObj);
    });
})();
