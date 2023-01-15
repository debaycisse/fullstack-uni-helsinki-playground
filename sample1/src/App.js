import { useState, useEffect } from 'react';
import Note from './components/Note';
import noteServices from './services/notes';
import Notifications from './components/Notifications';


/**
 * Using inline CSS rules for a component 
 */
import Footer from './components/Footer';

const App = () => {
  
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null)


  /************************************************************ 
   * Getting data from the server is achieved as follows
  ************************************************************/
  const hook = () => {
    /*axios
      .get('http://localhost:3001/notes')
      .then(response => {
        setNotes(response.data)
      })*/

    noteServices
      .getAll()
      .then(initialNotes=> {
      setNotes(initialNotes)
    })

  }

  useEffect(hook, [])
  
  
  const notesToShow = showAll? notes : notes.filter(note => note.important)

  const addNote = (event) => {
    event.preventDefault();
    
    const newNoteObject = {
      // id : notes.length + 1,
      content : newNote,
      date : new Date().toISOString(),
      important : Math.random() < 0.5
    }


    /************************************************************ 
     * Posting (saving) data to the server is achieved as follows
     * so that it persists in the database server.
    ************************************************************/
   /*axios
   .post('http://localhost:3001/notes', newNoteObject)
      .then(response => {
        setNotes(notes.concat(response.data))
        setNewNote('')
      }
      )
    }*/

    noteServices
      .create(newNoteObject)
      .then(newlyAddedNote => {
          setNotes(notes.concat(newlyAddedNote))
          setNewNote('')
        }
      )


  }
    
    const toggleImportanceOf = (id) => {
      // const exactNoteUrl = `http://localhost:3001/notes/${id}`
      const exactNote = notes.find(note => note.id === id)  // This is just a mere copy of the targetted note object.
      const exactNoteChangedImportantStatus = {...exactNote, important: !exactNote.important} // only the important property or key of the copied note, is changed
      
      
      /************************************************************ 
         * Put is used to make partial update to a data object 
         * resource and sent such to the server for persistency.
      ************************************************************/
      /************************************************************
       * Sending the copy of the exact note with important's field, having 
       * negation of its value from the original note from where we have copied.
      ************************************************************/
    /*axios
      .put(exactNoteUrl, exactNoteChangedImportantStatus)
      .then(response => {
          // every other note object is copied but the targetted note is replaced with object returned from the server
          setNotes(notes.map(note => note.id !== id? note : response.data)) 
        }
        )*/
        
        noteServices
        .update(id, exactNoteChangedImportantStatus)
        .then(returnedModifiedNote => {
            // every other note object is copied but the targetted note is replaced with object returned from the server
            setNotes(notes.map(
              note => note.id !== id? note : returnedModifiedNote
            )
            )
        }
      )
      .catch(error => {
            setErrorMessage(
              `Note '${exactNote.content}' was already removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 7000)
            // alert(`the note: ${exactNote.content} was already deleted from the server`)
            setNotes(notes.filter(note => note.id !== id))

      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  }

  return (
    <>
      <div>
        <h1>Notes</h1>
        {/* Testing creation of our own error customized notification */}
        <Notifications message={errorMessage} />
        <ul>
          {notesToShow.map(note => 
            <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
          )}
        </ul>
  
        <button onClick={() => setShowAll(!showAll)}> Show {showAll? 'Important Notes' : 'All Notes'} </button>
  
  
        <form onSubmit={addNote}>
          <input value={newNote} onChange={handleNoteChange} />
          <button type='submit'>save</button>
        </form>
      </div>
  
      <Footer />
    </>

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



