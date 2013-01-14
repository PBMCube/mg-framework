window.onload = function () {
    var connection = new WebSocket('ws://' + document.domain + ':8081');
    connection.onopen = function () {
    };
    connection.onmessage = function (e) {
        newMessage(e.data);
    };
    connection.onerror = function (error) {
        console.log('Websocketz errorz! ' + error);
    }

    var chatArea = document.getElementById('chatArea');
    var chatSub = document.getElementById('chatSubmit');
    var chatIn = document.getElementById('chatInput');
    var chatView = [];

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
        chatView.push('<br>' + message);
        if (chatView.length > 15) {
            chatView.shift();
        }
        chatArea.innerHTML = chatView.join('');
        console.log(chatView);
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

