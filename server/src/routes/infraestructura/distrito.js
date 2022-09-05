const express = require('express')
const router = express.Router()
const distrito = require('../../app/controllers/infraestructura/distrito')
const { insertar, actualizar, eliminar, buscar} = require('../../app/validator/infraestructura/distrito')

//rutas
//listar
router.post('/lista', distrito.lista)

//crear
router.post('/registro',insertar, distrito.registro) //validamos elos campos

//eliminar
router.post('/actualizar',actualizar, distrito.update) //validamos elos campos

//eliminar
router.post('/eliminar', eliminar, distrito.delete)

//buscar
router.post('/buscar',buscar, distrito.buscar) 

module.exports = router