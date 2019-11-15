const uuid = require('uuid/v1')

class Commets {
    constructor(iduser,aiduser,idveterinaria,idmascota,tipo,mensajes,fecha) {
        this._id = uuid()
        this.iduser = iduser
        this.aiduser = aiduser
        this.idveterinaria = idveterinaria
        this.idmascota = idmascota
        this.tipo = tipo// comentario, calificacion o msj a 
        this.mensajes= mensajes
        this.fecha = fecha
    }
}

module.exports = Commets