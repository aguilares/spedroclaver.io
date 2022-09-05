const { check } = require('express-validator')
const {validaciones} = require('./headers')

const vRed = [
    
    check('nombre').isLength({min:4, max:40}).exists(),  //minimo 4, max : 40 caracteres
    
    (req, res, next)=>{
        validaciones(req,res, next)
    }
]
module.exports = vRed