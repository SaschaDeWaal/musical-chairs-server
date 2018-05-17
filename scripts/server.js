const server = require('http').createServer();
const io = require('socket.io')(server);
const Player = require('./player.js');
const Game = require('./game.js');

let players = {};
let games = {};

io.sockets.on('connection', function(socket) {
  
  const id = socket.id;
  
  socket.on ('initialize', function () {
    const newPlayer = new Player (id);

    players[id] = newPlayer;

    socket.emit ('playerData', {id: id, players: players});
    console.log('new user ' + id);
  });
  
  socket.on('createOrJoinNewGame', function(data) {
    
    if(games[data.name] === undefined){
      const newGame = new Game(data.name);
      games[data.name] = newGame;
      
      console.log('create new game named: ' + data.name);
    }
    
    if(games[data.name].openToJoin) {
      games[data.name].addPlayer(players[id], socket);
      
      console.log('joined game named ' + data.name);
    }
    
  });
  
  socket.on('joinGame', function(data) {
    if(games[data.name] && games[data.name].openToJoin) {
      games[data.name].addPlayer(players[id], socket);
    }
  });
  
  socket.on('requestGameList', function(data) {
    
  });
   
});

console.log ('Server started.');
server.listen(3000);