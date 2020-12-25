class Player {
  private _id: string
  private _name: string
  private _isDrawing: boolean

  constructor(id: string, name: string) {
    this._id = id
    this._name = name
    this._isDrawing = false
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
}

export { Player }
