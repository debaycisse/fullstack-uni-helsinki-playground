/*

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
*/










import ReactDOM from 'react-dom/client'
import App from './App'
//import axios from 'axios'


// const promise = axios.get('http://localhost:3001/notes');
// promise.then(response => {
//   console.log(response)
// })

// const promise = axios.get('http://localhost:3001/notes').then(response => {
//   const notes = response.data;
//   console.log(notes);
// })

// let notes2;

/*axios
  .get('http://localhost:3001/notes')
  .then(response => {
      const notes = response.data;
      // notes2 = response.data;
      // console.log(notes);
      ReactDOM.createRoot(document.getElementById('root')).render(<App notes={notes} />)
    })*/



/*const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]*/

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)








/*
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <App notes={notes} />
)

// ReactDOM.render(<App />, document.getElementById('root'))
*/