require('dotenv').config()

let PORT = process.env.PORT
let API_KEY = process.env.API_KEY
let SECRET = process.env.SECRET

module.exports = {
    PORT,
    API_KEY,
    SECRET
}