import { useState, useEffect } from 'react';
import Note from './components/Note';
import axios from 'axios';

const App = () => {
  
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);



  const hook = () => {
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        setNotes(response.data)
      })
  }

  useEffect(hook, [])
  
  
  const notesToShow = showAll? notes : notes.filter(note => note.important)

  const addNote = (event) => {
    event.preventDefault();
    
    const newNoteObject = {
      id : notes.length + 1,
      content : newNote,
      date : new Date().toISOString(),
      important : Math.random() < 0.5
    }
    
    setNotes(notes.concat(newNoteObject));
    console.log('new note object', notes.concat(newNoteObject)) 
    setNewNote('a new note...');

  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>

      <button onClick={() => setShowAll(!showAll)}> Show {showAll? 'Important Notes' : 'All Notes'} </button>


      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default App;

















/*
import { useState } from "react"

const App = () => {
  const allPersons = [
    { name: 'Arto Hellas', phoneNumber: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phoneNumber: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phoneNumber: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phoneNumber: '39-23-6423122', id: 4 },
  ]

  const [persons, setPersons] = useState(allPersons) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) =>{
    event.preventDefault()
    if (persons.find(person => person.name === newName)){
      const message = `${newName} is already added to the phonebook.`
      alert(message)
    }
    else{
      const newNameObject = {
        name: newName, phoneNumber: newNumber
      }
      setPersons(persons.concat(newNameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }
  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }


  const filterContact = (event) => {
    if (event.target.value.length === 0){
      setPersons(allPersons)
    }else{
      const filtered = persons.filter(person =>
        person.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
      setPersons(filtered)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input onChange={filterContact} />
      <h2>Add a new contact</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleChangeName} />
          number: <input value={newNumber} onChange={handleChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Contacts</h2>
      <div>
        {persons.map((person) => <li key={person.name}>{person.name} {person.phoneNumber}</li>)}
      </div>
    </div>
  )
}

export default App
*/



