const { check } = require('express-validator')
const { validaciones } = require('../../validator/headers')

const insertar = [

    check('nombre')
        .exists()
        .isString()
        .isUppercase()
        .isLength({ min: 3, max: 50 }),

    check('idCentro')
        .exists()
        .isNumeric()
        .isLength({ min: 1, max: 10 }),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

const actualizar = [
        
    check('id')
        .exists()
        .isNumeric()
        .isLength({ min: 1, max: 10 }),


    check('nombre')
    .exists()
    .isString()
    .isUppercase()
    .isLength({ min: 3, max: 50 }),


    check('idCentro')
        .exists()
        .isNumeric()
        .isLength({ min: 1, max: 10 }),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

const eliminar = [

    check('id')
        .exists()
        .isNumeric()
        .isLength({ min: 1, max: 10 }),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

const buscar = [

    check('nombre')
        .exists()
        .isNumeric()
        .isLength({ min: 7, max: 15 }),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

module.exports = { insertar, actualizar, eliminar, buscar}