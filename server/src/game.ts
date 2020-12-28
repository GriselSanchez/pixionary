import fs from 'fs'

import { Player } from './player'
import { utils } from './utils'

class Game {
  private _players: Player[] = []
  private _playerDrawing: Player | null = null
  private _currentWord = ''
  private _turn = 0
  private _turnTime: number
  private _timer?: NodeJS.Timeout

  constructor(turnTime?: number) {
    this._turnTime = turnTime ?? 10000
  }

  startTimer(callback: () => void): void {
    if (this._timer) clearTimeout(this._timer)
    this._timer = setTimeout(callback, this._turnTime)
  }

  get turnTime(): number {
    return this._turnTime
  }

  get players(): Player[] {
    return this._players
  }

  get playerDrawing(): Player | null {
    return this._playerDrawing
  }

  set playerDrawing(playerDrawing: Player | null) {
    if (this._playerDrawing) this._playerDrawing.isDrawing = false
    if (playerDrawing) playerDrawing.isDrawing = true

    this._playerDrawing = playerDrawing
  }

  get currentWord(): string {
    return this._currentWord
  }

  addPlayer(player: Player): void {
    this._players.push(player)
  }

  removePlayer(id: string): void {
    this._players = this._players.filter(player => player.id !== id)
  }

  findPlayerByName(name: string): Player | undefined {
    return this._players.find(player => player.name === name)
  }

  nextTurn(): Player | undefined {
    if (this._turn >= this._players.length) this._turn = 0
    this._playerDrawing = this._players[this._turn]

    this._turn = this._turn + 1
    this.randomWord = 'medium'

    return this._playerDrawing
  }

  isWinnerWord(word: string): boolean {
    return word === this._currentWord
  }

  get scores(): { name: string; score: number }[] {
    return this._players.map(({ name, score }) => ({ name, score }))
  }

  private set randomWord(category: string) {
    const data = fs.readFileSync('src/words.json')
    const words = JSON.parse(data.toString())

    const wordsFromCategory = words[category]
    const randomWordIndex = utils.getRandomInt(0, wordsFromCategory.length - 1)

    this._currentWord = wordsFromCategory[randomWordIndex]
  }
}

export { Game }
