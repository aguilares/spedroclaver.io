const express = require('express')
const router = express.Router()
const cRed = require('../../app/controllers/infraestructura/cRed')
const vRed =require('../../app/validator/vRed')


//rutas
//listar
router.post('/lista', cRed.lista)

//crear
router.post('/registro',vRed, cRed.registro) //validamos elos campos

//eliminar
router.post('/actualizar',vRed, cRed.update) //validamos elos campos

//eliminar
router.post('/eliminar', cRed.delete)

//buscar
router.post('/buscar',vRed, cRed.buscar) 

module.exports = router