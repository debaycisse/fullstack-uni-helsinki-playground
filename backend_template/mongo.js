const mongoose = require('mongoose')

if (process.argv.length < 3){
    console.log(`give password as argument`);
    process.exit(1);
}

const password = process.argv[2]

const uri = `mongodb+srv://fullstack:${password}@cluster0.qsnhtah.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(uri)

/**
 * The schema tells Mongoose how the note objects are to be stored in the database.
 */
const noteSchema = new mongoose.Schema(
    {
        content: String,
        important: Boolean,
    }
)

/**
 * In the Note model definition, the first "Note" parameter is the singular name of 
 * the model. The name of the collection will be the lowercase plural notes, because 
 * the Mongoose convention is to automatically name collections as the 
 * plural (e.g. notes) when the schema refers to them in the singular (e.g. Note).
 */
const Note = mongoose.model('Note', noteSchema)

/*
// Creating a new note
const note = new Note(
    {
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
)

// Saving a new note to DB and closing the connection after the data has been saved or stored
note.save().then(returnedResult => {
        console.log(`Note saved !`)
        mongoose.connection.close()
    }   
)
*/


// Fetching data from the DB
Note.find({}).then(returnedData => {
    returnedData.forEach(note => {
        console.log(`${note}`)
    })
    mongoose.connection.close(true);
})