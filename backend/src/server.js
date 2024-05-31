const { WebSocketServer } = require('ws')
const dotenv = require('dotenv')

dotenv.config()

const wss = new WebSocketServer({ port: process.env.PORT || 8080 })

wss.on('connection', (ws) => {
  ws.on('error', console.error)

  ws.on('message', (data) => {
    //Pega todos os clientes conectados e repassa para todos a mesma mensagem
    wss.clients.forEach((client) => client.send(data.toString()))
  })

  console.log('client connected');

})