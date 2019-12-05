const express = require('express')
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())

let roles = [
  {
    id: 1,
    name: 'Keyholder',
    alignment: 'Good',
    description: 'You hold the key',
    actions: 'identify good wizard',
  },
  {
    id: 2,
    name: 'Good Wizard',
    alignment: 'Good',
    description: 'You need the keyholder to trust you',
    actions: 'identify the traitor',
  },
  {
    id: 3,
    name: 'Guard',
    alignment: 'Good',
    description: 'You defend the keyholder',
    actions: 'identify the traitor',
  },
  {
    id: 4,
    name: 'Traitor',
    alignment: 'Evil',
    description: 'You must sow discord and aid Evil Wizard',
    actions: 'not stop the game',
  },
  {
    id: 5,
    name: 'Evil Wizard',
    alignment: 'Evil',
    description: 'You must find the keyholder',
    actions: 'identify the keyholder',
  }
]

let gameLogic = [
  {
    players: 4,
    wizards: 1,
    guards: 1,
    traitors: 1,
    keyholder: 1,
    good: 1,
    evil: 1
  },
  {
   players: 5,
   wizards: 2,
   guards: 1,
   traitors: 1,
   keyholder: 1,
   good: 1,
   evil: 1
 },
 {
   players: 6,
   wizards: 2,
   guards: 2,
   traitors: 1,
   keyholder: 1,
   good: 1,
   evil: 1
 },
 {
   players: 7,
   wizards: 2,
   guards: 3,
   traitors: 1,
   keyholder: 1,
   good: 1,
   evil: 1
 },
 {
   players: 8,
   wizards: 2,
   guards: 3,
   traitors: 2,
   keyholder: 1,
   good: 1,
   evil: 1
 },
 {
   players: 9,
   wizards: 3,
   guards: 3,
   traitors: 2,
   keyholder: 1,
   good: 2,
   evil: 2
 },
 {
   players: 10,
   wizards: 3,
   guards: 4,
   traitors: 2,
   keyholder: 1,
   good: 2,
   evil: 2
 }
 ]


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/roleCount', (request, response) => {
  response.send(`<h1>There are ${roles.length} roles.</h1>`)
})

app.get('/gameLogic', (request, response) => {
  response.send(`<h3>${gameLogic.map(game => `If there are ${game.players} players, there is ${game.wizards} wizards`)} </h3>`)
})

app.get('/roles', (request, response) => {
  response.json(roles)
})

app.delete('/roles/:id', (request, response) => {
  const id = +request.params.id
  roles = roles.filter(role => role.id !== id)

  response.status(204).end()
})

app.get('/roles/:id', (request, response) => {
  const id = +request.params.id
  const role = roles.find(role => role.id === id)

  if (role) {
    response.send(`Role Id: ${role.id} The ${role.name} is a ${role.alignment} character. They can ${role.actions}.`)
  } else {
    response.status(404).end()
  }
})

app.post('/roles', (request, response) => {
  const maxId = roles.length > 0
  ? Math.max(...roles.map(role => role.id))
  : 0

  const role = request.body
  role.id = maxId + 1
  console.log(role)

  response.json(role)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
