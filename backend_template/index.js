const express = require('express')

const app = express()

const cors = require('cors')


let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2022-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2022-05-30T19:20:14.298Z",
      important: true
    },
    {
      id: 4,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2023-01-30T19:20:14.298Z",
      important: true
    }
  ]

  
const requestLogger = (request, response, next) => {
  console.log('Method: ', request.method);
  console.log('Path: ', request.path);
  console.log('Body: ', request.body);
  console.log('------------------------');
  next()
}


app.use(express.json())   // this ensures that we will be able use JSON_parser -> https://fullstackopen.com/en/part3/node_js_and_express#deleting-resources 

app.use(requestLogger)

app.use(cors())


// Route for the root - returns all an H1 element.
app.get('/', (request, response) => {
    /*const nextF = () => response.send('<h1>Hello, World - from ExpressJS</h1>')
    app.use(requestLogger(request, response, nextF))*/
    response.send('<h1>Hello, World - from ExpressJS</h1>')
})

// Route for all note's objects or resources - returns all note's objects or resources
app.get('/api/notes', (request, response) => {
    response.json(notes)
})

// Route for getting or fetching a specific note via its id number
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)

  // Handle the scenerio when a requested resource does not exist
  if(note){
    response.json(note)
  }else{
    response.statusMessage = 
      "The requested resource's id does not exist in the DB, please, ensure that the resources exists and use its correct id in your request."
    response.status(404).send()
  }
})

// Route for deleting a specific note via its id number
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

const generateId = () => {
  const maxId = notes.length > 0? Math.max(...notes.map(n => n.id)) : 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  // const maxID = notes.length > 0? Math.max(...notes.map(n => n.id)) : 0
  // const newNote = request.body
  // newNote.id = maxID + 1

  // notes.concat(newNote)

  // response.json(newNote)

  // check to know if the request is empty
  const body = request.body
  if(!body.content){
    response.status(400).json({
      "error": "Missing content."
    })
  }

  const newNote = {
    "content": body.content,
    "important": body.important || false,
    "date": new Date(),
    "id": generateId()
  }

  notes.concat(newNote)

  response.json(newNote)
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})






/*
// http server setup
const http = require('http')

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2022-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2022-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2022-05-30T19:20:14.298Z",
      important: true
    }
  ]


const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(notes))
})

const PORT = 3001
app.listen(PORT)
console.log(`Server is running on port ${PORT}`)
// console.log('Hello, World!')
*/
