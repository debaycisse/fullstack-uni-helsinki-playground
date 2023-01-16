// expressJS server setup
const { request } = require('express')
const { response } = require('express')
const express = require('express')

const app = express()

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

// Route for the root - returns all an H1 element.
app.get('/', (request, response) => {
    response.send('<h1>Hello, World - from ExpressJS</h1>')
})

// Route for all note's objects or resources - returns all note's objects or resources
app.get('/api/notes', (request, response) => {
    response.json(notes)
})

// Route for a specific note
app.get('/api/notes:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  response.json(note)
})

const PORT = 3001
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
