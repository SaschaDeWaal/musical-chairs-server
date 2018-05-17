const states = {
  waitingOnPlayers: 0,
  musicTime: 1,
  chairsTime: 2,
  finished: 3,
}

class Game {
   constructor(name){
      this.state = states.waitingOnPlayers;
      this.chairs = 0;
     
      this.players = [];
      this.sockets = {};
   }
  
  openToJoin() {
    return this.state === states.waitingOnPlayers;
  }
  
  addPlayer(player, socket) {
      this.players.push(player);
      this.sockets[player.id] = socket;
    
      if(this.players.lenght == 2){
        this.startGame();
      }
    
      socket.on ('positionUpdate', function (data) {
        player.x = data.x;
        player.y = data.y;
        player.z = data.z;

        this.broadcast('playerMoved', data);
      });
  }
  
  startGame() {
    this.state = states.playing;
    this.broadcast('gameStarted', {});
    this.chairs = this.players.lenght;
  }
  
  update() {
     if (this.state === states.playing){
         this.updateGame();
     }
  }
  
  updateGame() {
    
  }
  
  broadcast(key, data) {
    this.sockets.forEach(socket => {
        socket.emit (key, data);
    });
  }
}

module.exports = Game;