import axios from "axios";

const baseUrl = 'http://localhost:3001/notes'

const nonExistingData = {
    "id": 1000,
    "content": "This content is not saved on the server",
    "date": "2023-1-15T13:39:31.098Z",
    "important": true
  }
const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data.concat(nonExistingData))
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default {
    getAll: getAll,
    create: create,
    update: update
}
