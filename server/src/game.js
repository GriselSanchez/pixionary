var fs = require("fs");

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = class Game {
  players = [];
  turn = 0;
  playerDrawing;
  currentWord;

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

  getCurrentWord() {
    return this.currentWord;
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

    this.currentWord = this.getRandomWord();
    return this.playerDrawing;
  }

  getRandomWord(category = "medium") {
    const data = fs.readFileSync("src/words.json");
    const words = JSON.parse(data);

    const wordsFromCategory = words[category];
    const randomWordIndex = getRandomInt(0, wordsFromCategory.length - 1);

    return wordsFromCategory[randomWordIndex];
  }
};
