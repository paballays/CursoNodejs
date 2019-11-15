const uuid = require('uuid/v1')

class Mascota {
    constructor(iduser,nombre, tipo,Esraza,Razita, fechaNacimiento) {
        this._id = uuid()
        this.iduser = iduser
        this.nombre = nombre
        this.tipo = tipo
        this.Esraza= Esraza
        this.Razita= Razita
        this.fechaNacimiento = fechaNacimiento
    }
}

module.exports = Mascota