/**
 * It's important that dotenv gets imported before the note model is imported. 
 * This ensures that the environment variables from the .env file are available 
 * globally before the code from the other modules is imported.
 */
require('dotenv').config()

const express = require('express')

const app = express()

const cors = require('cors')

const morgan = require('morgan')

const mongoose = require('mongoose')

const Note = require('./models/note')



// DO NOT SAVE YOUR PASSWORD TO GITHUB!!

// const password = process.argv[2]

// const password1 = process.env.REACT_APP_MONGODB_PASSWORD



// const mongoDbUrl = `mongodb+srv://fullstack:${password}@cluster0.qsnhtah.mongodb.net/noteApp?retryWrites=true&w=majority`

/*mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI)

const noteSchema = mongoose.Schema(
  {
    content: String,
    important: Boolean
  }
)

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model('Note', noteSchema)*/




/*let notes = [
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
  ]*/

  
//  custom middleware creation
const requestLogger = (request, response, next) => {
  console.log('Method: ', request.method);
  console.log('Path: ', request.path);
  console.log('Body: ', request.body);
  console.log('------------------------');
  next()
}
  


// Middlewares
app.use(express.static('build'))
app.use(express.json())   // this ensures that we will be able use JSON_parser -> https://fullstackopen.com/en/part3/node_js_and_express#deleting-resources 
app.use(requestLogger)
app.use(cors())
app.use(morgan('combined'))





// Route for the root - returns all an H1 element.
app.get('/', (request, response) => {
    /*const nextF = () => response.send('<h1>Hello, World - from ExpressJS</h1>')
    app.use(requestLogger(request, response, nextF))*/
    response.send('<h1>Hello, World - from ExpressJS</h1>')
})

// Route for all note's objects or resources - returns all note's objects or resources
app.get('/api/notes', (request, response) => {
    // response.json(notes)
    Note.find({}).then(allNotes => {
      response.json(allNotes)
    })

})

// Route for getting or fetching a specific note via its id number
app.get('/api/notes/:id', (request, response, next) => {
  
  Note.findById(request.params.id).then(returnedNote => {
    if(returnedNote){
      response.json(returnedNote)
    }
    else{
      response.status(404).end()
    }
  }).catch(error => next(error))


  // ---------------------------------------------------------------------//
  /*const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)

  // Handle the scenerio when a requested resource does not exist
  if(note){
    response.json(note)
  }else{
    response.statusMessage = 
      "The requested resource's id does not exist in the DB, please, ensure that the resources exists and use its correct id in your request."
    response.status(404).send()
  }*/
})

// Route for deleting a specific note via its id number
app.delete('/api/notes/:id', (request, response) => { // best way to delete is using findByIdAndRemove() method

  Note.findByIdAndRemove(request.params.id).then(result => {
    /**
     * In both cases of
     * 1 - when a note with the given id exists
     * 2 - when a note with the given id doesn't exist 
     * the delete will still return a successful status of 204.
     * Though, one can check if an actual resource was deleted or not
     * by using the returned result variable
    */  
    response.status(204).end()
  }).catch(error => next(error))

})


/* 
 * The toggling of the important property of a note can be
 * accomplished by using findByIdAndUpdate() method
*/
app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important
  }

  Note.findByIdAndUpdate(request.params.id, note, {new: true})  // parameter '{new: true}' causes this event handler to be called with the newly created object 'note' instead of the existing object that owns the given id
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
}
)


const generateId = () => {
  const maxId = notes.length > 0? Math.max(...notes.map(n => n.id)) : 0
  return maxId + 1
}

app.post('/api/notes', (request, response, next) => {
  // const maxID = notes.length > 0? Math.max(...notes.map(n => n.id)) : 0
  // const newNote = request.body
  // newNote.id = maxID + 1

  // notes.concat(newNote)

  // response.json(newNote)

  // check to know if the body of the request is empty
  const body = request.body

  /*if(body.content === undefined){
    return response.status(400).json({
      "error": "Missing content."
    })
  }*/

  const newNote = new Note(
    {
      content: body.content,
      important: body.important || false,
      date: new Date(),
    }
  )

  newNote
    .save()
      .then(savedNote => {
        response.json(savedNote)
      })
      .catch(error => next(error))

})




const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint or route' })
}
app.use(unknownEndpoint)  // handler of requests with unlnown endpoint (route)


const errorHandler = (error, request, response, next) => {
  console.log(`Error Message : ${error.message}`)
  
  if (error.name === 'CastError'){
    return response.status(400).send({error: 'malformatted id'})
  }
  else if (error.name === 'ValidationError'){
    return response.status(400).json({error: error.message})
  }
  
  next(error)
}
app.use(errorHandler) // This has to be the last loaded middleware


const PORT = process.env.PORT
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
