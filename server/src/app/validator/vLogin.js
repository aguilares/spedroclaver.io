

// la cantidad de caracteres en el campo usuario es min: 4 y max: 20, en el campo password min:4 y max: 200
// no se permite que lo campos esten vacios


const { check } = require('express-validator')
const { validaciones } = require('./headers')
const vUsuario = [
    check('usuario').isLength({ min: 4 }).exists(),
    check('pass').isLength({ min: 4 }).exists(),
    (req, res, next) => {
        validaciones(req, res, next)
    }

]
module.exports = vUsuario