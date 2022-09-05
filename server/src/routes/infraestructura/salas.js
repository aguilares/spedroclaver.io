const express = require('express')
const router = express.Router()
const salas = require('../../app/controllers/infraestructura/salas')
const { insertar, actualizar, eliminar, buscar} = require('../../app/validator/infraestructura/salas')


//rutas
//listar
router.post('/lista', salas.lista)

//crear
router.post('/registro',insertar, salas.registro) //validamos elos campos

//eliminar
router.post('/actualizar',actualizar, salas.update) //validamos elos campos

//eliminar
router.post('/eliminar', eliminar, salas.delete)

//buscar
router.post('/buscar',buscar, salas.buscar) 

module.exports = router