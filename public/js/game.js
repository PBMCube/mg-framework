function () {
    var connection = new WebSocket('ws://' + document.domain + ':8081');
    connection.onopen = function () {
        connection.send(playerName);
    };
    connection.onmessage = function (e) {
    };

    var gamePick = document.getElementById('gamePick');
    var score = document.getElementById('score');

    gamePick.addEventListener('click', function (e) {
        connection.send(chatIn.value);
    });
}
