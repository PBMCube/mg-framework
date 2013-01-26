window.onload = function () {
    var thisPlayer = {};
    var connection = new WebSocket('ws://' + document.domain + ':8082');
    var url = window.location.toString();
    var validPrefixes = {
        'p': function (msg) {
                thisPlayer.ID = msg;
            },
        'c': function (msg) {
                newMessage(msg);
            },
        'g': function (msg) {
                console.log(msg);
            }
    };
    thisPlayer.name = parseQueryString(url)['user-name'];
    connection.onopen = function () {
        connection.send(JSON.stringify({'p':{'name':thisPlayer.name}}));
        connection.send(JSON.stringify({'c':true}));
    };
    connection.onmessage = function (e) {
        var obj = JSON.parse(e.data);
        for (prefix in obj) {
            if (prefix in validPrefixes) {
                validPrefixes[prefix](obj[prefix]);
            }
        }
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
        if (typeof message === 'object') {
            message.forEach(function (item) { 
                chatView.push('<br>' + item);
                if (chatView.length > 15) {
                    chatView.shift();
                }
            });
        } else {
            chatView.push('<br>' + message);
            if (chatView.length > 15) {
                chatView.shift();
            }
        }
        chatArea.innerHTML = chatView.join('');
    }

    var gameLink = document.getElementById('newGame');
    gameLink.addEventListener('click', function (e) { 
        var messageObj = {'g': {ID:'newGame'}};
        var msg = JSON.stringify(messageObj);
        connection.send(msg);
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

