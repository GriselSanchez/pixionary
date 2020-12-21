module.exports = class Game {
  players = [];
  turn = 0;
  playerDrawing;

  addPlayer(_player) {
    this.players.push(_player);
  }

  removePlayer(_id) {
    this.players = this.players.filter((player) => player.id !== _id);
  }

  getPlayers() {
    return this.players;
  }

  getPlayerDrawing() {
    return this.playerDrawing;
  }

  setPlayerDrawing() {
    if (this.playerDrawing) this.playerDrawing.setIsDrawing(false);

    const newPlayerDrawing = this.players[this.turn];
    if (newPlayerDrawing) newPlayerDrawing.setIsDrawing(true);

    this.playerDrawing = newPlayerDrawing;
  }

  nextTurn() {
    if (this.turn < this.players.length) {
      this.setPlayerDrawing();
    } else {
      this.turn = 0;
      this.setPlayerDrawing();
    }
    this.turn++;
    return this.playerDrawing;
  }
};
