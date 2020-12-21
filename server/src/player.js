module.exports = class Player {
  id;
  name;
  isDrawing;

  constructor(_id) {
    this.id = _id;
  }

  setIsDrawing(_isDrawing) {
    this.isDrawing = _isDrawing;
  }

  setName(_name) {
    this.name = _name;
  }
};
