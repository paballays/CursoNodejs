const uuid = require('uuid/v1')

class Perdidas {
    constructor(idusuario,idmascota,detalle,fecha,estado) {
        this._id = uuid()
        this.user = idusuario
        this.mascota= idmascota
        this.detalle= detalle
        this.fecha= fecha
        this.estado = estado
    }
}

module.exports = Perdidas