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

app.get('/test', (req, res) => {
  res.send(`TEST${process.env.WEB_ADDRESS}`)
})

const nextTurnHandler = () => {
  const { id, isDrawing, name } = game.nextTurn()

  io.sockets.emit('next-turn', {
    playerDrawing: { id, isDrawing, name },
    nextWord: game.currentWord,
  })
}

io.sockets.on('connection', (socket: Socket) => {
  console.log(`Player ${socket.id} connected`)

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
    const hasWon = game.playerWon(text)

    if (hasWon) {
      nextTurnHandler()
      io.sockets.emit('chat', { text: 'Player won', name })
    } else io.sockets.emit('chat', { text, name })
  })

  socket.on('disconnect', () => {
    game.removePlayer(socket.id)
    console.log(`Player ${socket.id} disconnected`)
  })
})
