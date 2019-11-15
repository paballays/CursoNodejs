// Importamos el submódulo Router
const { Router } = require('express')

// Importamos modulo para validacion de IDs
const validator = require('validator')

// Importamos la base de datos y los modelos
const db = require('../database')
const Vacunas = require('../database/models/vacunas.model')

// Instanciamos un router
const router = Router()

// Ruta para obtener todas las mascotas
router.get('/', function (req, res, next) {
    // Aca deben verifiar si hay query string
    // En caso de existir, filtrar segun los parametros

    db.vacunas.find({}, function (error, vacunas) {
            if (error) {
                next(error)
            }
            res.send(vacunas)
        })
})

// Ruta para obtener los datos de una mascota en particular
router.get('/:idVacunas', function (req, res, next) {
    const idVacunas = req.params.idVacunas;

    // Validamos el ID de la mascota buscada
    if (!validator.isUUID(idVacunas)) {
        let error = new 
        Error('El id especificado no tiene un formato correcto')
        next(error)
    }

    db.vacunas
        .findOne({ _id: idVacunas }, function (error, vacunas) {
            if (error) {
               return next(error)
            }
            res.send(vacunas)
        })
})

// Ruta para crear una vacuna
router.post('/', function (req, res, next) {
    const data = req.body;

    // Opcionalmente, aqui puede validar los datos del body
    // Como por ejemplo, que la fecha de nacimiento tenga el formato correcto

    const vacuna = new Vacunas(data.tipo, data.fechaRealizacion,data.idMascota)

    db.vacunas
        .insert(vacunas, function (error, vacunaInsertada) {
            if (error) {
               return next(error)
            }
            res.send(vacunaInsertada)
        })
})

// Definir el resto de las rutas necesarias aqui debajo
// ...

// Exportamos nuestro router
module.exports = router;