window.onload = function () {
    var connection = new WebSocket('ws://' + document.domain + ':8081');
    var chatArea = document.getElementById('chatArea');
    connection.onopen = function () {
    };
    connection.onmessage = function (e) {
        newMessage(e.data);
    };
    connection.onerror = function (error) {
        console.log('Websocketz errorz! ' + error);
    }

    var chatSub = document.getElementById('chatSubmit');
    var chatIn = document.getElementById('chatInput');

    var queryStringObj  = parseQueryString(window.location.toString());
    var name = queryStringObj['user-name'];

    function chatSubmit () {
        if (chatIn.value !== '') {
            connection.send(chatIn.value);
            newMessage(name + ': ' + chatIn.value);
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
        chatArea.innerHTML += '<br>' + message;
    }
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

