module.exports = class Player {
  id;
  isTurn;

  constructor(_id, _isTurn) {
    this.id = _id;
    this.isTurn = _isTurn;
  }

  setIsTurn(_isTurn) {
    this.isTurn = _isTurn;
  }
};
