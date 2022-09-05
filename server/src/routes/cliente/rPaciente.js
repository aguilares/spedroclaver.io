const express = require('express')
const router = express()
// ó
// const router = express.Router()
const cPaciente = require('../../app/controllers/cliente/cPaciente')
const { vPacienteInsertar, vPacienteActualizar, vPacienteEliminar, vPacienteBuscar} =require('../../app/validator/cliente/vPaciente')

//rutas 
router.post('/lista', cPaciente.lista)
router.post('/milista',  cPaciente.miLista) 
router.post('/registro', vPacienteInsertar, cPaciente.registro)
router.post('/actualizar',  vPacienteActualizar ,cPaciente.update)
router.post('/buscar',vPacienteBuscar, cPaciente.buscar) 
router.post('/eliminar', vPacienteEliminar, cPaciente.delete) 


module.exports = router 