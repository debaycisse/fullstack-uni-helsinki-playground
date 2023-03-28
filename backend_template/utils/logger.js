// Information priting out to the console
const info = (...params) => {
    console.log(...params);
}

// Error printing out to the console
const error = (...params) => {
    error.log(...params)
}

module.exports = {
    info: info,
    error: error
}