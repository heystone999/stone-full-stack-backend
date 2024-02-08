require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


const app = express()


morgan.token('postData', (request, response) => {
  if (request.method === 'POST') {
    return JSON.stringify(request.body)
  }
  return ''
})


app.use(cors())
app.use(express.json())
// app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))
app.use(express.static('dist'))




app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  console.log('info');
  const personCount = persons.length
  const dateTime = new Date().toString()
  const infoMessage = `<p>Phonebook has info for ${personCount} people</p>
  <p>${dateTime}</p>`
  response.send(infoMessage)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number is missing'
    })
  }
  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  const newPerson = {
    id: Math.floor(Math.random() * 100000),
    name: body.name,
    number: body.number
  }
  persons = persons.concat(newPerson)
  response.json(newPerson)
})






const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`);