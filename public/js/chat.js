window.onload = function () {
    var connection = new WebSocket('ws://' + document.domain + ':8081');
    var chatArea = document.getElementById('chatArea');
    connection.onopen = function () {
    };
    connection.onmessage = function (e) {
        chatArea.innerHTML += '<br>' + e.data;
    };

    var chatSub = document.getElementById('chatSubmit');
    var chatIn = document.getElementById('chatInput');
    chatSub.addEventListener('click', function (e) {
        connection.send(chatIn.value);
    });
};


