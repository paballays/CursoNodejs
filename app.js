
// Importamos express
const express = require('express')

// Importamos los middleware necesarios
const morgan = require('morgan')
const bodyParser = require('body-parser')
const helmet = require('helmet')

// Importamos los routers
const mascotasRouter = require('./routes/mascotas.js')
const vacunasRouter = require('./routes/vacunas.js')
const usuariosRouter = require('./routes/usuarios')

// Instanciamos una app de Express
const app = express()
const suwager= require('swagger-ui-express')
const apldocs= require('./Docus/index.js')
// Usamos helmet con opciones por defecto
app.use(helmet())

// Utilizamos los middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use('/Docus',suwager.serve,suwager.setup(apldocs))
function checkQuery(req,resp,next){
    if(Object.keys(req.query).length==0){
        req.query= null
    }
    next()
}
app.use(checkQuery)
app.get('/', (req, res, next) => {
    res.status(200)
    res.send({
        nombre: 'API Veterinarias',
        version: '1.4.5',
        links: [{'rel':'mascotas'},{'href':'/mascotas'},
        {'rel':'vacunas'},{'href':'/vacunas'},
        {'rel':'usuarios'},{'href':'/usuarios'},
        {'rel':'veterinrias'},{'href':'/veterinarias'},
        {'rel':'enAdopcion'},{'href':'/enadopcion'},
        {'rel':'extraviadas'},{'href':'/extraviadas'},
        {'rel':'calificaciones'},{'href':'/calificaciones'}
    ]
    })
})

// Le indicamos a nuestra app que use los routers
app.use('/mascotas',mascotasRouter)
app.use('/vacunas', vacunasRouter)
app.use('/usuarios', usuariosRouter)

// Establecemos el middleware para manejo de error 404
app.use((req, res, next) => {
    res.status(404)
        .send({
            error: 'Recurso no encontrado',
        })
})

// Establecemos el middleware para manejo de error 500
app.use((err, req, res, next) => {
    res.status(500)
        .send({
            error: err.message,
        })
})

// Exportamos nuestra app
module.exports = app
