window.onload = function () {
    var thisPlayer;
    var connection = new WebSocket('ws://' + document.domain + ':8082');
    var url = window.location.toString();
    connection.onopen = function () {

        connection.send(JSON.stringify({'p': {'name':parseQueryString(url)['name']}}));
        connection.send(JSON.stringify({'c':true}));
    };
    connection.onmessage = function (e) {
        var obj = JSON.parse(e.data);
        console.log(obj);
        newMessage(obj['c']);
    };
    connection.onerror = function (error) {
        console.log('Websocketz errorz! ' + error);
    }

    var chatArea = document.getElementById('chatArea');
    var chatSub = document.getElementById('chatSubmit');
    var chatIn = document.getElementById('chatInput');
    var chatView = [];

    var queryStringObj  = parseQueryString(window.location.toString());

    function chatSubmit () {
        if (chatIn.value !== '') {
            connection.send(JSON.stringify({'c':chatIn.value}));
            newMessage(thisPlayer.name + ': ' + chatIn.value);
            chatIn.value = '';
        }
    }
    window.addEventListener('keypress', function (e) {
        if (e.keyIdentifier === 'Enter') {
            chatSubmit();
        }
    });
        
    chatSub.addEventListener('click', chatSubmit);

    function newMessage(message) {
        chatView.push('<br>' + message);
        if (chatView.length > 15) {
            chatView.shift();
        }
        chatArea.innerHTML = chatView.join('');
    }

    var gameLink = document.getElementById('gameLink');
    gameLink.addEventListener('click', function (e) {
    });
};

function parseQueryString(url) {
    var result = {};
    var params = url.split("?")[1].split("&");
    for (var index in params) {
        var paramKeyValue = params[index].split("=");
        result[paramKeyValue[0]] = paramKeyValue[1];
    }
    return result;
}

