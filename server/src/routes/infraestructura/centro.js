const express = require('express')
const router = express.Router()
const centro = require('../../app/controllers/infraestructura/centro')
const { insertar, actualizar, eliminar, buscar} = require('../../app/validator/infraestructura/centro')


//rutas
//listar
router.post('/lista', centro.lista)

//crear
router.post('/registro',insertar, centro.registro) //validamos elos campos

//eliminar
router.post('/actualizar',actualizar, centro.update) //validamos elos campos

//eliminar
router.post('/eliminar', eliminar, centro.delete)

//buscar
router.post('/buscar',buscar, centro.buscar) 

module.exports = router