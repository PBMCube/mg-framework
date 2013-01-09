/*
 * Filename: Mindgames.js
 * Mindgames App Entry Point
 * Author: Ben Tyler
 * Date: Jan 5, 2013
 * License: Artistic License 2.0
 *
 */


var app = {
    Server: require('./lib/Server').Server,
    Lobby: require('./lib/Lobby').Lobby,
    PlayerManager: require('./lib/PlayerManager.js').PlayerManager 
};

app.PlayerManager.init(app);
app.Server.start(app);
app.Lobby.start(8081, app);
