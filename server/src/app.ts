import express from 'express'
import http from 'http'
import cors from 'cors'
import { Server, Socket } from 'socket.io'

import { Game } from './game'
import { Player } from './player'

const PORT = process.env.PORT || 3001
const app = express()
const server = http.createServer(app)
const game = new Game()
const io = new Server(server, {
  cors: {
    origin: process.env.WEB_ADDRESS || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

app.set('port', PORT)
app.use(cors())

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

const nextTurnHandler = (winner?: Player | undefined) => {
  // TODO: set score acording to time
  if (winner) winner.addScore(100)
  const player = game.nextTurn()

  if (player) {
    const { id, isDrawing, name, score } = player
    io.sockets.emit('next-turn', {
      playerDrawing: { id, isDrawing, name, score },
      nextWord: game.currentWord,
      globalScores: game.scores,
      time: game.turnTime,
    })
  }

  game.startTimer(nextTurnHandler)
}

io.sockets.on('connection', (socket: Socket) => {
  console.log(`Player ${socket.id} connected`)

  // TODO: add a create game where user chooses mode, time and category
  /*   socket.on('play', () => {
    io.sockets.emit('play', { turnTime: game.turnTime })
    nextTurnHandler()
  }) */

  socket.on('join', (name: string) => {
    const player = new Player(socket.id, name)
    game.addPlayer(player)
  })

  socket.on('next-turn', nextTurnHandler)

  socket.on('draw', data => {
    socket.broadcast.emit('draw', data)
  })

  socket.on('draw-pixel', data => {
    socket.broadcast.emit('draw-pixel', data)
  })

  socket.on('chat', ({ text, name }) => {
    const hasWon = game.isWinnerWord(text)

    if (hasWon) {
      const winner = game.findPlayerByName(name)
      nextTurnHandler(winner)
      io.sockets.emit('chat', { text: 'Player won', name })
    } else io.sockets.emit('chat', { text, name })
  })

  socket.on('disconnect', () => {
    game.removePlayer(socket.id)
    console.log(`Player ${socket.id} disconnected`)
  })
})
