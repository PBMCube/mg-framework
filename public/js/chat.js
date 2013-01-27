(function () {
    var chatArea = document.getElementById('chatArea');
    var chatSub = document.getElementById('chatSubmit');
    var chatIn = document.getElementById('chatInput');
    var chatView = [];

    if (typeof window.MG === "undefined") {
        window.MG = {};
    }

    window.MG.ChatClass = function (MGClient) {
        var self = {};
        self.routingTable = {
            'msg':self.newMessage
        };
        self.newMessage = function (message) {
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
        };

        function chatSubmit () {
            if (chatIn.value !== '') {
                MGClient.send({'c':{'msg':chatIn.value}});
                chatIn.value = '';
            }
        }
        window.addEventListener('keypress', function (e) {
            if (e.keyIdentifier === 'Enter') {
                chatSubmit();
            }
        });
        chatSub.addEventListener('click', chatSubmit);
        return self;
    };
})();
