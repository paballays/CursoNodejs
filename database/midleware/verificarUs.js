const jwt = require('jsonwebtoken');
var moment = require('moment');

exports.estaAutenticado = function(req, res, next) {
  //const token =null
    if(!req.headers.authorization) {
     res.status(403)
      .send({message: "Tu petición esta sin cabecera de autorización"});
      //return next(error);
  }
  token = req.headers.authorization.replace('Bearer ', '')

  jwt.verify(token, process.env.SECRECTPASS, function(err, decoded) {
    if (err) {
      res.status(401).send({
        error: 'Token inválido'
      })
      //return next(error);
    } else {
      req.decoded = decoded;
      req.user = token;
      //res.send({message: 'Awwwww yeah!!!!'})
    }
  })

  /*if(payload.exp <= moment().unix()) {
      
          req.status(401)
          .send({message: "El token ha expirado"});
          return next(error);
      }*/  


next();
}
