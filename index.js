const app = require('./app')
const http = require('http')
const config = require('./config')

const server = http.createServer(app)

server.listen(config.PORT, () => {
    console.log(`Running on ${config.PORT}`)
})