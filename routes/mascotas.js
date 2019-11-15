// Importamos el submódulo Router
const { Router } = require('express')
const tieneToken= require('../database/midleware/verificarUs.js')

// Importamos modulo para validacion de IDs
const validator = require('validator')

// Importamos la base de datos y los modelos
const db = require('../database')
const Mascota = require('../database/models/mascotas.model')

// Instanciamos un router
const router = Router()
let consulaMascota={}

// Ruta para obtener todas las mascotas
router.get('/',tieneToken.estaAutenticado, function (req, res, next) {
    // Aca deben verifiar si hay query string
    // En caso de existir, filtrar segun los parametros
    let consultaMascota={}
    const miquery= req.query


    function parserarparam(param){
     switch (param){
        case 'false': return false// parseamos valores no parametros 
        case 'true': return true // lo haciamos porque la db solo graba texto y el html es solo texto
         default: param
            return param
     }   
    }
  
    if(miquery){
    db.mascotas.find({consulaMascota
    }, function (error, mascotas) {
            if (error) {
                next(error)
            }
        if(Object.keys(miquery).length>0){
            for(miprop in miquery){
                consultaMascota[miprop]= parserarparam(miquery[miprop])
            }
        }

            db.mascotas.find(consultaMascota, function (error, mascotas) {
                if (error) {
                    return next(error)
                }
                    mascotas.foreach(function(item){
                         [{'links':'self $(item._id)'}]//lo hacemos para que sea auto navegable la api 
                    });
                    
                    
                    res.send(mascotas)
            })
        })

    }else{
        db.mascotas.find({}, function (error, mascotas) {
            if (error) {
                return next(error)
            }
                
                res.send(mascotas)
        })

    }
})

// Ruta para obtener los datos de una mascota en particular
router.get('/:idMascota', tieneToken.estaAutenticado,function (req, res, next) {
    const idMascota = req.params.idMascota;

    // Validamos el ID de la mascota buscada
    if (!validator.isUUID(idMascota)) {
        let error = new 
        Error('El id especificado no tiene un formato correcto')
        next(error)
    }

    db.mascotas
        .findOne({ _id: idMascota }, function (error, mascota) {
            if (error) {
               return next(error)
            }
            res.send(mascota)
        })
})

// Ruta para crear una mascota ACCIONES DEFINIDAS POST-PATCH-DELETE-GET
//API ResT proviene o esta enlazada del proticolo de http
router.post('/',tieneToken.estaAutenticado, function (req, res, next) {
    const data = req.body;

    // Opcionalmente, aqui puede validar los datos del body
    // Como por ejemplo, que la fecha de nacimiento tenga el formato correcto

    const mascota = new Mascota(data.iduser,data.nombre, data.tipo,data.Esraza,
        data.Razita, data.fechaNacimiento)

    db.mascotas
        .insert(mascota, function (error, mascotaInsertada) {
            if (error) {
                res.status(404).send()
               return next(error)
            }
            res.status(204)
            res.send(mascotaInsertada)
        })
})

// Definir el resto de las rutas necesarias aqui debajo
// ...
// Ruta para eliminar una mascota
router.delete('/:idMascota',tieneToken.estaAutenticado, function(req, res, next) {
    const idMascota = req.params.idMascota;

    // Validamos el ID de la mascota buscada
    if (!validator.isUUID(idMascota)) {
        let error = new Error('El id especificado no tiene un formato correcto')
        return next(error)
    }

    db.mascotas.remove({_id: idMascota}, function(error, seEliminoLaMascota) {
        if(error) {
            return next(error)
        }

        if(seEliminoLaMascota) {
            res.status(200)
            res.send({
                "mensaje": "Mascota eliminada con éxito"
            })
        } else {
            let error = new Error('No se puedo eliminar la mascota')
            return next(error)
        }
    })
})

// Ruta para actualizar una mascota
router.patch('/:idMascota', tieneToken.estaAutenticado,function(req, res, next) {
    const data = req.body
    const idMascota = req.params.idMascota;

    // Validamos el ID de la mascota buscada
    if (!validator.isUUID(idMascota)) {
        let error = new Error('El id especificado no tiene un formato correcto')
        return next(error)
    }

    db.mascotas
        .findOne({ _id: idMascota }, function (error, mascotaParaActualizar) {
            if (error) {
                return next(error)
            }
            
            for(param in data) {
                if(mascotaParaActualizar.hasOwnProperty(param)) {
                    mascotaParaActualizar[param] = parsearParam(data[param])
                }
            }

            db.mascotas.update({_id: idMascota}, mascotaParaActualizar, function(error, seActualizoLamascota) {
                if(error) {
                    return next(error)
                }

                if(seActualizoLamascota) {
                    res.send({
                        mensaje: "La mascota fue actualizada"
                    })
                } else {
                    let error = new Error('No se pudo actualizar la mascota')
                    return next(error)
                }
            })
        })
})

// Exportamos nuestro router
module.exports = router;

/*
// Importamos el submódulo Router
const { Router } = require('express')

// Importamos modulo para validacion de IDs
const validator = require('validator')

// Importamos la base de datos y los modelos
const db = require('../database')
const Mascota = require('../database/models/mascotas.model')

// Instanciamos un router
const router = Router()

function parsearParam(paramValue) {
    if(paramValue == 'true') {
        return true
    }
    if(paramValue == 'false') {
        return false
    }
    return paramValue
}

// Ruta para obtener todas las mascotas
router.get('/', function (req, res, next) {
    let consultaMascota = {}
    const query = req.query;

    if(Object.keys(query).length > 0) {
        for(param in query) {
            consultaMascota[param] = parsearParam(query[param])
        }
    }

    db.mascotas.find(consultaMascota, function (error, mascotas) {
            if (error) {
                return next(error)
            }
            res.send(mascotas)
        })
})

// Ruta para obtener los datos de una mascota en particular
router.get('/:idMascota', function (req, res, next) {
    const idMascota = req.params.idMascota;

    // Validamos el ID de la mascota buscada
    if (!validator.isUUID(idMascota)) {
        let error = new Error('El id especificado no tiene un formato correcto')
        return next(error)
    }

    db.mascotas
        .findOne({ _id: idMascota }, function (error, mascota) {
            if (error) {
                return next(error)
            }
            res.send(mascota)
        })
})

// Ruta para crear una mascota
router.post('/', function (req, res, next) {
    const data = req.body;

    // Opcionalmente, aqui puede validar los datos del body
    // Como por ejemplo, que la fecha de nacimiento tenga el formato correcto

    const mascota = new Mascota(data.nombre, data.tipo, data.esDeRaza, data.raza, data.fechaNacimiento)

    db.mascotas
        .insert(mascota, function (error, mascotaInsertada) {
            if (error) {
                return next(error)
            }
            res.send(mascotaInsertada)
        })
})

// Ruta para eliminar una mascota
router.delete('/:idMascota', function(req, res, next) {
    const idMascota = req.params.idMascota;

    // Validamos el ID de la mascota buscada
    if (!validator.isUUID(idMascota)) {
        let error = new Error('El id especificado no tiene un formato correcto')
        return next(error)
    }

    db.mascotas.remove({_id: idMascota}, function(error, seEliminoLaMascota) {
        if(error) {
            return next(error)
        }

        if(seEliminoLaMascota) {
            res.send({
                "mensaje": "Mascota eliminada con éxito"
            })
        } else {
            let error = new Error('No se puedo eliminar la mascota')
            return next(error)
        }
    })
})

// Ruta para actualizar una mascota
router.patch('/:idMascota', function(req, res, next) {
    const data = req.body
    const idMascota = req.params.idMascota;

    // Validamos el ID de la mascota buscada
    if (!validator.isUUID(idMascota)) {
        let error = new Error('El id especificado no tiene un formato correcto')
        return next(error)
    }

    db.mascotas
        .findOne({ _id: idMascota }, function (error, mascotaParaActualizar) {
            if (error) {
                return next(error)
            }
            
            for(param in data) {
                if(mascotaParaActualizar.hasOwnProperty(param)) {
                    mascotaParaActualizar[param] = parsearParam(data[param])
                }
            }

            db.mascotas.update({_id: idMascota}, mascotaParaActualizar, function(error, seActualizoLamascota) {
                if(error) {
                    return next(error)
                }

                if(seActualizoLamascota) {
                    res.send({
                        mensaje: "La mascota fue actualizada"
                    })
                } else {
                    let error = new Error('No se pudo actualizar la mascota')
                    return next(error)
                }
            })
        })
})

// Definir el resto de las rutas necesarias aqui debajo
// ...

// Exportamos nuestro router
module.exports = router;
*/