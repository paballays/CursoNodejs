const uuid = require('uuid/v1')

class Veterinarias {
    constructor(nombre,servicio,iduser,esActiva) {
        this._id = uuid()
        this.nombre = nombre
        this.servicio= servicio
        this.iduser= iduser
        this.esActiva = esActiva
    }
}

module.exports = Veterinarias