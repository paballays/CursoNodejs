const uuid = require('uuid/v1')
//el password se guarda hasheado
class Usuario {
    constructor(alias,email, password, rol,esUser) {
        this._id = uuid()
        this.alias = alias
        this.email = email
        this.password = password
        this.rol = rol// administrador, usuario, etc
        this.esUser = esUser// administrador, usuario, etc
    }
}

module.exports = Usuario