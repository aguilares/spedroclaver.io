const express = require('express')
const router = express.Router()
const solicitud = require('../../../app/controllers/servicios/complementarios/solicitud')
const { vPacienteBuscar } = require('../../../app/validator/cliente/vPaciente')
const { insertar, actualizar, eliminar, buscar, formEdit,eliminarSol,formEditadmin,hrs } = require('../../../app/validator/servicios/complementarios/sel')

//rutas
//listar
router.post('/lista', eliminar, solicitud.lista)
// mostrar salas
router.post('/salas', eliminar, solicitud.salas)
// mostrar camas 
router.post('/camas', eliminar, solicitud.camas)
// paciente
router.post('/paciente', vPacienteBuscar, solicitud.paciente)
// seguros
router.post('/seguros', eliminar, solicitud.seguros)
//examen
router.post('/lab_examen', eliminar, solicitud.examen)

router.post('/otroLaboratorio', solicitud.otroLaboratorio) // otro centro
router.post('/guardar', insertar, solicitud.guardar) // guardar solicitud
router.post('/modificar', actualizar, solicitud.modificar) // guardar solicitud
router.post('/eliminarsol', eliminarSol, solicitud.eliminar) // guardar solicitud


// roles serviciosdeprimera linea
router.post('/cantidadA', eliminar, solicitud.cantidadA)
router.post('/cantidadP', eliminar, solicitud.cantidadP)
router.post('/cantidadR', eliminar, solicitud.cantidadR)
router.post('/vercantidadA', eliminar, solicitud.a)
router.post('/vercantidadP', eliminar, solicitud.p)
router.post('/vercantidadR', eliminar, solicitud.r)
router.post('/buscarsolicitud', buscar, solicitud.buscarSolicitud)
router.post('/especifico', formEdit, solicitud.especifico)


// servicios rol administracion
router.post('/cantidadAadmin', eliminar, solicitud.cantidadAadmin)
router.post('/cantidadPadmin', eliminar, solicitud.cantidadPadmin)
router.post('/cantidadRadmin', eliminar, solicitud.cantidadRadmin)
router.post('/vercantidadAadmin', eliminar, solicitud.aadmin)
router.post('/vercantidadPadmin', eliminar, solicitud.padmin)
router.post('/vercantidadRadmin', eliminar, solicitud.radmin)
router.post('/especificoadmin', formEditadmin, solicitud.especificoadmin)
router.post('/buscarsolicitudadmin', buscar, solicitud.buscarSolicitudadmin)
router.post('/autorizar', eliminar, solicitud.validacionAutorizar)
router.post('/rechazar', eliminar, solicitud.validacionRechazar)


// usuarios area de servicios complementarios
router.post('/realizado', eliminar, solicitud.realizado)
router.post('/cantidadPservicios', eliminar, solicitud.cantidadPservicios)
router.post('/cantidadRservicios', eliminar, solicitud.cantidadRservicios)
router.post('/vercantidadPservicios', eliminar, solicitud.Pservicios)
router.post('/vercantidadRservicios', eliminar, solicitud.Rservicios)
router.post('/especificosevicios', eliminar, solicitud.especificoServicios)

// EXATRAER INFORMACION COMPLETA DE UNA SOLICITUD



module.exports = router