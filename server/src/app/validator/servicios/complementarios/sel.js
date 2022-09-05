const { check } = require('express-validator')
const { validaciones } = require('../../headers')

const insertar = [

    check('fecha_sol')
        .exists()
        .isDate('yyyy-MM-dd'), //la fecha de manera obligatoria debe venir bajo el formato yyyy-MM-dd

    check('hora_sol')
        .exists()
        .matches(/\d{2}[:]\d{2}[:]\d{2}/),
    // .isDate('HH:mm:ss'), //la fecha de manera obligatoria debe venir bajo el formato HH:mm:ssyyyy-MM-dd


    check('hora_toma_muestra')
        .exists()
        .matches(/\d{2}[:]\d{2}[:]\d{2}/),
    //     .isDate('HH:mm:ss'), //la fecha de manera obligatoria debe venir bajo el formato HH:mm:ss

    check('num_historial')
        .exists()
        .isNumeric()
        .isLength({ min: 1 }),

    check('diagnostico')
        .exists()
        .isString()
        .isUppercase()
        .isLength({ min: 5, max: 70 }),

    check('id_area')
        .exists()
        .isNumeric()
        .isLength({ min: 1 }),
    // check('idCentroAtareado')
    //     .exists()
    //     .isNumeric()
    //     .isLength({ min: 1}),

    check('id_cama')
        .isNumeric()
        .isLength({ min: 1 }),

    check('id_seguro')
        .exists()
        .isNumeric()
        .isLength({ min: 1 }),

    check('id_paciente')
        .exists()
        .isNumeric()
        .isLength({ min: 1 }),

    check('id_usuario')
        .exists()
        .isNumeric()
        .isLength({ min: 1 }),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

const actualizar = [

    check('id')
        .exists()
        .isNumeric()
        .isLength({ min: 1 }),

    check('fecha_sol')
        .exists()
        .isDate('yyyy-MM-dd'), //la fecha de manera obligatoria debe venir bajo el formato yyyy-MM-dd

    check('hora_sol')
        .exists()
        .matches(/\d{2}[:]\d{2}[:]\d{2}/),

    check('hora_toma_muestra')
        .exists()
        .matches(/\d{2}[:]\d{2}[:]\d{2}/),

    check('num_historial')
        .exists()
        .isNumeric()
        .isLength({ min: 1 }),

    check('diagnostico')
        .exists()
        .isString()
        .isUppercase()
        .isLength({ min: 5, max: 70 }),

    check('id_area')
        .exists()
        .isNumeric()
        .isLength({ min: 1 }),

    check('id_cama')
        .isNumeric()
        .isLength({ min: 1 }),

    check('id_seguro')
        .isNumeric()
        .isLength({ min: 1 }),

    check('id_paciente')
        .exists()
        .isNumeric()
        .isLength({ min: 1 }),

    check('id_usuario')
        .exists()
        .isNumeric()
        .isLength({ min: 1 }),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

const eliminar = [

    check('id')
        .exists()
        .isNumeric()
        .isLength({ min: 1 }),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

const eliminarSol = [

    check('id')
        .exists()
        .isNumeric()
        .isLength({ min: 1 }),
    check('id_usuario')
        .exists()
        .isNumeric()
        .isLength({ min: 1 }),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]


const formEdit = [

    check('user')
        .exists()
        .isNumeric()
        .isLength({ min: 1 }),
    check('sol')
        .exists()
        .isNumeric()
        .isLength({ min: 1 }),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

const formEditadmin = [

    check('sol')
        .exists()
        .isNumeric()
        .isLength({ min: 1 }),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

const buscar = [

    check('id')
        .exists()
        .isNumeric()
        .isLength({ min: 1 }),
    check('cinhc')
        .exists()
        .isNumeric()
        .isLength({ min: 1 }),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

const hrs = [

    check('id')
        .exists()
        .isNumeric()
        .isLength({ min: 1 }),
    check('hrs')
        .exists()
        .matches(/\d{2}[:]\d{2}[:]\d{2}/),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

module.exports = { insertar, actualizar, eliminar, formEdit, buscar, eliminarSol, formEditadmin,hrs }