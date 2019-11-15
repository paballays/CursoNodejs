var Datastore = require('nedb')

mascotas = new Datastore({ filename: './database/datastores/mascotas.db', autoload: true })
vacunas = new Datastore({ filename: './database/datastores/vacunas.db', autoload: true })
veterinarias = new Datastore({ filename: './database/datastores/veterinarias.db', autoload: true })
turnos = new Datastore({ filename: './database/datastores/turnos.db', autoload: true })
mas_perdidas = new Datastore({ filename: './database/datastores/perdidas.db', autoload: true })
comentarios = new Datastore({ filename: './database/datastores/comentarios.db', autoload: true })
Usuarios = new Datastore({ filename: './database/datastores/usuarios.db', autoload: true })

module.exports = {
    mascotas,vacunas,veterinarias,turnos,mas_perdidas,comentarios,Usuarios
}