const express = require('express')
const router = express.Router()
const area = require('../../app/controllers/infraestructura/area')

const { insertar, actualizar, eliminar, buscar} = require('../../app/validator/infraestructura/area')


//rutas
//listar
router.post('/lista', area.lista)

//crear
router.post('/registro', insertar, area.registro) //validamos elos campos

//eliminar
router.post('/actualizar',actualizar, area.update) //validamos elos campos

//eliminar
router.post('/eliminar', eliminar, area.delete)

//buscar
router.post('/buscar',buscar, area.buscar) 

module.exports = router