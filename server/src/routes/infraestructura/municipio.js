const express = require('express')
const router = express.Router()
const municipio = require('../../app/controllers/infraestructura/municipio')
const { insertar, actualizar, eliminar, buscar} = require('../../app/validator/infraestructura/municipio')


//rutas
//listar
router.post('/lista', municipio.lista)

//crear
router.post('/registro',insertar, municipio.registro) //validamos elos campos

//eliminar
router.post('/actualizar',actualizar, municipio.update) //validamos elos campos

//eliminar
router.post('/eliminar', eliminar, municipio.delete)

//buscar
router.post('/buscar',buscar, municipio.buscar) 

module.exports = router