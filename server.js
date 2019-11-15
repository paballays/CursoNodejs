const http = require('http')
const app = require('./app.js')
// Importamos dotenv
const dotenv = require('dotenv')

// Esta funcion busca automáticamente el archivo .env
dotenv.config()

// Creamos un nuevo servidor con nuestra app
const server = http.createServer(app)

server.on('listening', function() {
    console.info(`Servidor escuchando en http://localhost:${process.env.PORT}`)
})

// Ponemos a escuchar nuestro servidor en el puerto 3000-.
server.listen(process.env.PORT)