const { check } = require('express-validator')
const { validaciones } = require('../../validator/headers')

const vPacienteInsertar = [

    check('ci')
        .exists()
        .isNumeric()
        .isLength({ min: 7, max: 15 }),
    check('nombre')
        .exists()
        .isString()
        .isUppercase()
        .isLength({ min: 3, max: 40 }),
    check('apellido1')
        .exists()
        .isUppercase()
        .isString()
        .isLength({ min: 3, max: 25 }),
    check('apellido2')
        .exists()
        .isUppercase()
        .isString()
        .isLength({ min: 3, max: 25 }),
    check('sexo')
        .exists()
        .isUppercase()
        .isString()
        .isLength({ min: 1, max: 1 }),
    check('fechaNac')
        .exists()
        .isDate('yyyy-MM-dd'), //la fecha de manera obligatoria debe venir bajo el formato yyyy-MM-dd
    check('celular')
        .exists()
        .isNumeric()
        .isLength({ min: 7, max: 15 }),
    check('telef')
        .isNumeric()
        .isLength({ min: 4, max: 25 }),
    check('direccion')
        .exists()
        .isUppercase()
        .isString()
        .isLength({ min: 5, max: 70 }),
    check('reds')
        .exists()
        .isNumeric(),
    check('id')
        .exists()
        .isNumeric()
        .isLength({ min: 1, max: 10 }),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

const vPacienteActualizar = [

    check('id')
        .exists()
        .isNumeric()
        .isLength({ min: 1, max: 10 }),

    check('ci')
        .exists()
        .isNumeric()
        .isLength({ min: 7, max: 15 }),
    check('nombre')
        .exists()
        .isString()
        .isUppercase()
        .isLength({ min: 3, max: 40 }),
    check('apellido1')
        .exists()
        .isUppercase()
        .isString()
        .isLength({ min: 3, max: 25 }),
    check('apellido2')
        .exists()
        .isUppercase()
        .isString()
        .isLength({ min: 3, max: 25 }),
    check('sexo')
        .exists()
        .isUppercase()
        .isString()
        .isLength({ min: 1, max: 1 }),
    check('fechaNac')
        .exists()
        .isDate('yyyy-MM-dd'), //la fecha de manera obligatoria debe venir bajo el formato yyyy-MM-dd
    check('celular')
        .exists()
        .isNumeric()
        .isLength({ min: 7, max: 15 }),
    check('telef')
        .isNumeric()
        .isLength({ min: 4, max: 25 }),
    check('direccion')
        .exists()
        .isUppercase()
        .isString()
        .isLength({ min: 5, max: 70 }),
    check('id_red')
        .exists()
        .isNumeric(),
    check('validacion')
        .exists()
        .isNumeric()
        .isLength({ min: 7, max: 15 }),
    check('estado')
        .exists()
        .isNumeric()
        .isLength({ min: 1, max: 10 }),
    check('idPersonal')
        .exists()
        .isNumeric()
        .isLength({ min: 1, max: 6 }),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

const vPacienteEliminar = [

    check('id')
        .exists()
        .isNumeric()
        .isLength({ min: 1, max: 10 }),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

const vPacienteBuscar = [

    check('ci')
        .exists()
        .isNumeric()
        .isLength({ min: 7, max: 15 }),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

module.exports = { vPacienteInsertar, vPacienteActualizar, vPacienteEliminar, vPacienteBuscar}