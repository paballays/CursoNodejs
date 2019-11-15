const uuid = require('uuid/v1')

class Turnos {
    constructor(idveterinaria,idusuario,idmascota,fecha,esActiva,estado) {
        this._id = uuid()
        this.veterinaria = idveterinaria
        this.user = idusuario
        this.mascota= idmascota
        this.fecha= fecha
        this.esActiva = esActiva
        this.estado = estado
    }
}

module.exports = Turnos