const express = require('express')
const router = express.Router()
const camas = require('../../app/controllers/infraestructura/camas')

const { insertar, actualizar, eliminar, buscar} = require('../../app/validator/infraestructura/camas')


//rutas
//listar
router.post('/lista', camas.lista)

//crear
router.post('/registro',insertar, camas.registro) //validamos elos campos

//eliminar
router.post('/actualizar',actualizar, camas.update) //validamos elos campos

//eliminar
router.post('/eliminar', eliminar, camas.delete)

//buscar
router.post('/buscar',buscar, camas.buscar) 

module.exports = router