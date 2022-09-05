const express = require('express')
const router = express.Router()
const unidad = require('../../app/controllers/infraestructura/unidad')
const { insertar, actualizar, eliminar, buscar} = require('../../app/validator/infraestructura/unidad')


//rutas
//listar
router.post('/lista', unidad.lista)

//crear
router.post('/registro',insertar, unidad.registro) //validamos elos campos

//eliminar
router.post('/actualizar',actualizar, unidad.update) //validamos elos campos

//eliminar
router.post('/eliminar', eliminar, unidad.delete)

//buscar
router.post('/buscar',buscar, unidad.buscar) 

module.exports = router