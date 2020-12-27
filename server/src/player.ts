class Player {
  private _id: string
  private _name: string
  private _isDrawing: boolean
  private _score: number

  constructor(id: string, name: string) {
    this._id = id
    this._name = name
    this._isDrawing = false
    this._score = 0
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get isDrawing(): boolean {
    return this._isDrawing
  }

  set isDrawing(isDrawing: boolean) {
    this._isDrawing = isDrawing
  }

  get score(): number {
    return this._score
  }

  addScore(score: number): void {
    this._score += score
  }
}

export { Player }
