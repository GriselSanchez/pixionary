module.exports = class Game {
  players = [];
  turn = 0;

  addPlayer(_player) {
    this.players.push(_player);
  }

  getPlayers() {
    return this.players;
  }

  setPlayersTurn(_turn) {
    this.players.forEach((player) => player.setIsTurn(false));
    this.players[_turn].setIsTurn(true);
  }

  nextTurn() {
    if (this.turn < this.players.length) {
      this.setPlayersTurn(this.turn);
    } else {
      this.turn = 0;
      this.setPlayersTurn(this.turn);
    }
    this.turn = this.turn + 1;
  }
};
