const { NULL } = require('mysql/lib/protocol/constants/types')
const pool = require('../../../../../BD/bd1')
let errores = require('../../errores')



const Solicitud = {}


Solicitud.lista = errores(async (req, res) => {
    pool.query('SELECT r.nombre as red, m.nombre as municipio  from centro c  inner join distrito d on c.id_distrito = d.id inner join municipio m on d.id_municipio = m.id inner join reds r on m.id_red = r.id WHERE c.id = ? and c.estado = true and d.estado = true and m.estado = true',
        [req.body.id],
        (err, rows) => {
            return res.json(rows)
        })
})

Solicitud.salas = errores(async (req, res) => {

    // console.log("mi lista", req.body)
    pool.query('select s.id as id, s.nombre as nombre from area a INNER join salas s on s.id_area = a.id WHERE a.id = ? and a.estado= true and s.estado = true', [req.body.id],
        (err, rows) => {
            return res.json(rows)
        })
})

Solicitud.camas = errores(async (req, res) => {

    // console.log("mi lista", req.body)
    pool.query('select c.id as id , c.numero as nombre from salas s inner join camas c on c.id_sala = s.id WHERE s.id = ? and s.estado= true and c.estado= true', [req.body.id],
        (err, rows) => {
            return res.json(rows)
        })
})


Solicitud.paciente = errores(async (req, res) => {

    // console.log("mi lista", req.body)
    pool.query('select id, ci, nombre, apellido1, apellido2, sexo, fechaNac from paciente WHERE ci = ? and estado= true', [req.body.ci],
        (err, rows) => {

            return res.json(rows)
        })
})

Solicitud.seguros = errores(async (req, res) => {

    // console.log("mi lista", req.body)
    pool.query('SELECT s.id as id, s.nombre as nombre from centro c inner join centro_seguro cs on cs.id_centro = c.id inner join seguros s on cs.id_seguro = s.id where c.id = ? and c.estado= true and s.estado=true', [req.body.id],
        (err, rows) => {
            return res.json(rows)
        })
})

Solicitud.examen = errores(async (req, res) => {

    // console.log("mi lista", req.body)
    pool.query('select DISTINCT(e.id) as idExamen, e.nombre as examen, count(e.id) as cantidaItem  FROM centro c inner join unidad u on c.id = u.id_centro inner join area a on u.id = a.id_unidad inner join examen_area ea on a.id = ea.id_area inner join item_examen ie on ie.id = ea.id_item_examen inner join examen e on e.id = ie.id_examen inner join tipo_examen te on te.id = e.id_tipo_examen where c.id =? and te.nombre=? and te.estado = true and e.estado = true and ie.disponible = true and ea.estado = true GROUP BY (e.id)',
        [req.body.id, req.body.examen], (err, cantidad) => {
            // FORMATO DE QUERY 
            // idExamen      examen                      cantidaItem
            // 1          EXAMEN                             54
            // 2          EXAMEN DE HEMOTERAPIA              2
            // 4          BANCO DE SANGRE                    10

            pool.query('select ea.id as idAsignacion, ie.nombre as itemExamen, e.id as idExamen, e.nombre as examen  FROM centro c inner join unidad u on c.id = u.id_centro inner join area a on u.id = a.id_unidad inner join examen_area ea on a.id = ea.id_area inner join item_examen ie on ie.id = ea.id_item_examen inner join examen e on e.id = ie.id_examen inner join tipo_examen te on te.id = e.id_tipo_examen where c.id =? and te.nombre=? and te.estado = true and e.estado = true and ie.disponible = true and ea.estado = true',
                [req.body.id, req.body.examen], (err, examenes) => {
                    // console.log(cantidad, examenes)
                    return res.json({ 'cantidad': cantidad, 'examenes': examenes })
                })
        })
})


Solicitud.otroLaboratorio = errores(async (req, res) => {
    pool.query('SELECT DISTINCT(c.id) as id, c.nombre as nombre from centro c inner join unidad u on c.id = u.id_centro inner join area a on u.id = a.id_unidad inner join examen_area ea on a.id = ea.id_area where c.estado = true and u.estado = true and a.estado= true and ea.estado = true',
        (err, rows) => {
            return res.json(rows)
        })
})

Solicitud.guardar = errores(async (req, res) => {
    // console.log(req.body.examen[0])
    if (req.body.examen.length != 0) {
        // console.log("mi lista", req.body)
        let id_cama = null

        if (req.body.id_cama !== 0) {
            id_cama = req.body.id_cama
        }

        let id = null
        pool.query('SELECT id_area FROM examen_area WHERE id = ?', [req.body.examen[0]], (err, centro) => {
            // console.log('id Area atareado: ', centro[0].id_area)
            pool.query('insert into solex_lsss set validacion = 0, realizado = false,  fecha_sol = ?, hora_sol= ?, hora_toma_muestra = ?, hora_rec_sol = null,  num_historial = ?, diagnostico = ?, id_area = ?, id_area_tarea = ?, id_cama = ?, id_seguro  = ?, id_paciente = ?, id_usuario = ?, estado = true',
                [req.body.fecha_sol, req.body.hora_sol, req.body.hora_toma_muestra, parseInt(req.body.num_historial), req.body.diagnostico, parseInt(req.body.id_area), centro[0].id_area, parseInt(id_cama), parseInt(req.body.id_seguro), parseInt(req.body.id_paciente), parseInt(req.body.id_usuario)],
                (err, rows) => {
                    pool.query('SELECT MAX(id) as id FROM solex_lsss WHERE id_usuario = ? and estado = true', [req.body.id_usuario], (err, row) => {
                        if (row[0] != null) {
                            id = row[0].id
                            // console.log('ID DE LA ULTIMA SOLICITUD INSERTADA:', id)
                            req.body.examen.forEach(id_Examen => {
                                pool.query('insert into item_solicitud_laboratorio set id_solicitud_laboratorio = ?, id_examen_laboratorio_area = ?, estado = true', [id, parseInt(id_Examen)])
                            });
                            return res.send({ status: 1 })
                        }
                    })
                }
            )
        })
    }
})

Solicitud.modificar = errores(async (req, res) => {
    console.log(req.body)
    if (req.body.examen.length != 0) {
        // console.log("mi lista", req.body)
        let id_cama = null

        if (req.body.id_cama !== 0) {
            id_cama = req.body.id_cama
        }

        pool.query('SELECT id_area FROM examen_area WHERE id = ?', [req.body.examen[0]], (err, centro) => {
            // console.log('id Area atareado: ', centro[0].id_area)
            pool.query('update solex_lsss set validacion = 0, realizado = false,  fecha_sol = ?, hora_sol= ?, hora_toma_muestra = ?, hora_rec_sol = null,  num_historial = ?, diagnostico = ?, id_area = ?, id_area_tarea = ?, id_cama = ?, id_seguro  = ?, id_paciente = ?, id_usuario = ?, estado = true where id = ? and id_usuario = ? and validacion = 0',
                [req.body.fecha_sol, req.body.hora_sol, req.body.hora_toma_muestra, parseInt(req.body.num_historial), req.body.diagnostico, parseInt(req.body.id_area), centro[0].id_area, parseInt(id_cama), parseInt(req.body.id_seguro), parseInt(req.body.id_paciente), parseInt(req.body.id_usuario), parseInt(req.body.id), parseInt(req.body.id_usuario)],
                (err, rows) => {
                    pool.query('update item_solicitud_laboratorio set estado = false where id_solicitud_laboratorio = ? ', [parseInt(req.body.id)], (err, rows) => {
                        req.body.examen.forEach(id_Examen => {
                            pool.query('insert into item_solicitud_laboratorio set id_solicitud_laboratorio = ?, id_examen_laboratorio_area = ?, estado = true', [req.body.id, parseInt(id_Examen)])
                        });
                    })
                    return res.send({ status: 1 })
                }
            )
        })
    }
})

Solicitud.eliminar = errores(async (req, res) => {

    pool.query('update solex_lsss set  estado = false where id = ? and id_usuario = ?', [parseInt(req.body.id), parseInt(req.body.id_usuario)],
        (err, rows) => {
            pool.query('update item_solicitud_laboratorio set estado = false where id_solicitud_laboratorio = ? ', [parseInt(req.body.id)])
            return res.send({ status: 1 })
        }
    )
})

Solicitud.cantidadA = errores(async (req, res) => {
    // console.log('se solicito a funcion cantidadA', req.body)
    pool.query('SELECT COUNT(id) as cantidad from solex_lsss where id_usuario = ? and validacion = 1 and estado = true', [req.body.id],
        (err, rows) => {
            if (rows[0] !== 'undefined') {
                res.json({ 'a': rows[0].cantidad })
            }
        })
})

Solicitud.cantidadP = errores(async (req, res) => {
    // console.log('se solicito a funcion cantidadP', req.body)
    pool.query('SELECT COUNT(id) as cantidad from solex_lsss where id_usuario = ? and validacion = 0 and estado = true', [req.body.id],
        (err, rows) => {
            // console.log('filas Aceptados tamaño',rows[0])
            if (rows[0] !== 'undefined') {
                return res.json({ 'p': rows[0].cantidad })
            }
        })
})

Solicitud.cantidadR = errores(async (req, res) => {
    // console.log('se solicito a funcion cantidadR', req.body)
    pool.query('SELECT COUNT(id) as cantidad from solex_lsss where id_usuario = ? and validacion = 2 and estado = true', [req.body.id],
        (err, rows) => {
            // console.log('filas Aceptados tamaño',rows[0])
            if (rows[0] !== 'undefined') {
                return res.json({ 'r': rows[0].cantidad })
            }
        }
    )
})

// VALORES RETORNADOS EN LAS CONSULTAS SON DE LA MISMA ESTRUCTURA
// +***************************************************************************************************************************************************************************
Solicitud.a = errores(async (req, res) => {
    pool.query("SELECT sl.id,sl.validacion,sl.realizado, DATE_FORMAT(sl.fecha_sol, '%d/%m/%Y') as fecha_sol,sl.hora_sol, sl.diagnostico, sl.num_historial, concat(p.nombre,' ',p.apellido1,' ',p.apellido2) as paciente, sl.hora_toma_muestra, sl.hora_rec_sol, a.nombre as area, c.nombre as centroTarea from solex_lsss sl inner join paciente p on sl.id_paciente = p.id inner join area a on sl.id_area = a.id inner join area a2 on a2.id = sl.id_area_tarea inner join unidad u on u.id =a2.id_unidad inner join centro c on c.id = u.id_centro   where sl.id_usuario = ? and sl.validacion = 1 and sl.estado = true and p.estado = true ORDER by sl.fecha_sol desc", [req.body.id],
        (err, solicitud) => {
            return res.json(solicitud)
        })
})

Solicitud.p = errores(async (req, res) => {
    pool.query("SELECT sl.id,sl.validacion,sl.realizado, DATE_FORMAT(sl.fecha_sol, '%d/%m/%Y') as fecha_sol,sl.hora_sol, sl.diagnostico, sl.num_historial, concat(p.nombre,' ',p.apellido1,' ',p.apellido2) as paciente, sl.hora_toma_muestra, sl.hora_rec_sol, a.nombre as area, c.nombre as centroTarea from solex_lsss sl inner join paciente p on sl.id_paciente = p.id inner join area a on sl.id_area = a.id inner join area a2 on a2.id = sl.id_area_tarea inner join unidad u on u.id =a2.id_unidad inner join centro c on c.id = u.id_centro   where sl.id_usuario = ? and sl.validacion = 0 and sl.estado = true and p.estado = true ORDER by sl.fecha_sol desc", [req.body.id],
        (err, solicitud) => {
            return res.json(solicitud)
        })
})

Solicitud.r = errores(async (req, res) => {
    pool.query("SELECT sl.id,sl.validacion,sl.realizado, DATE_FORMAT(sl.fecha_sol, '%d/%m/%Y') as fecha_sol,sl.hora_sol, sl.diagnostico, sl.num_historial, concat(p.nombre,' ',p.apellido1,' ',p.apellido2) as paciente, sl.hora_toma_muestra, sl.hora_rec_sol, a.nombre as area, c.nombre as centroTarea from solex_lsss sl inner join paciente p on sl.id_paciente = p.id inner join area a on sl.id_area = a.id inner join area a2 on a2.id = sl.id_area_tarea inner join unidad u on u.id =a2.id_unidad inner join centro c on c.id = u.id_centro   where sl.id_usuario = ? and sl.validacion = 2 and sl.estado = true and p.estado = true ORDER by sl.fecha_sol desc", [req.body.id],
        (err, solicitud) => {
            return res.json(solicitud)
        })
})



Solicitud.especifico = errores(async (req, res) => {
    // console.log(req.body.id)
    pool.query("SELECT concat(pe.nombre,' ',pe.apellido1,' ',pe.apellido2) as personal, a.nombre as area, un.nombre as unidad, ce.nombre as centro, m.nombre as municipio, r.nombre as red, sl.id,sl.validacion,sl.realizado, DATE_FORMAT(sl.fecha_sol, '%d/%m/%Y') as fecha_sol,sl.hora_sol , sl.hora_rec_sol, sl.diagnostico, sl.num_historial, p.id as idPaciente, concat(p.nombre,' ',p.apellido1,' ',p.apellido2) as paciente,p.ci, p.fechaNac, p.sexo, sl.hora_toma_muestra, sl.hora_rec_sol, c.id as idCentroTarea, c.nombre as centroTarea from solex_lsss sl inner join paciente p on sl.id_paciente = p.id inner join area a on sl.id_area = a.id inner join area a2 on a2.id = sl.id_area_tarea inner join unidad u on u.id =a2.id_unidad inner join centro c on c.id = u.id_centro inner join usuario us on us.id = sl.id_usuario inner join personal pe on pe.id = us.id_personal inner join unidad un on a.id_unidad = un.id inner join centro ce on ce.id = un.id_centro inner join distrito d on d.id = c.id_distrito inner join municipio m on m.id = d.id_municipio inner join reds r on r.id = m.id_red  where sl.id_usuario = ? and sl.id = ? and sl.estado = true and p.estado = true",
        [req.body.user, req.body.sol], (err, solicitud) => {
            // console.log(solicitud[0].id)
            if (solicitud[0] != null) {
                pool.query('SELECT s.id,s.nombre FROM solex_lsss sl INNER join seguros s on sl.id_seguro = s.id where sl.id = ?', [solicitud[0].id], (err, seguro) => {
                    pool.query('SELECT c.id as idCama, c.numero as numero, s.id as idSala, s.nombre as sala FROM solex_lsss sl inner join camas c on sl.id_cama = c.id inner join salas s on c.id_sala = s.id where sl.id = ?', [solicitud[0].id], (err, camaSala) => {
                        pool.query('SELECT ea.id as idExamen, ie.nombre as nombreExamen, e.nombre as grupo FROM solex_lsss sl inner join item_solicitud_laboratorio isl on sl.id = isl.id_solicitud_laboratorio inner join examen_area ea on isl.id_examen_laboratorio_area = ea.id inner join item_examen ie on ea.id_item_examen = ie.id inner join examen e on e.id = ie.id_examen where sl.id = ? and isl.estado = true',
                            [solicitud[0].id], (err, item) => {
                                let idSeguro, nombreSeguro, idCama, numero, idSala, sala = null
                                if (seguro[0] != null) {
                                    idSeguro = seguro[0].id
                                    nombreSeguro = seguro[0].nombre
                                }
                                if (camaSala[0] != null) {
                                    idCama = camaSala[0].idCama
                                    numero = camaSala[0].numero
                                    idSala = camaSala[0].idSala
                                    sala = camaSala[0].sala
                                }
                                // console.log(solicitud)
                                return res.json({ 'solicitud': solicitud, 'idSeguro': idSeguro, 'seguro': nombreSeguro, 'idCama': idCama, 'numero': numero, 'idSala': idSala, 'sala': sala, 'item': item })
                            })
                    })
                })
            }
        })
})

Solicitud.buscarSolicitud = errores(async (req, res) => {
    // console.log(req.body)
    pool.query("SELECT sl.id,sl.validacion,sl.realizado, DATE_FORMAT(sl.fecha_sol, '%d/%m/%Y') as fecha_sol,sl.hora_sol, sl.diagnostico, sl.num_historial, concat(p.nombre,' ',p.apellido1,' ',p.apellido2) as paciente, sl.hora_toma_muestra, sl.hora_rec_sol, a.nombre as area, c.nombre as centroTarea from solex_lsss sl inner join paciente p on sl.id_paciente = p.id inner join area a on sl.id_area = a.id inner join area a2 on a2.id = sl.id_area_tarea inner join unidad u on u.id =a2.id_unidad inner join centro c on c.id = u.id_centro   where sl.id_usuario = ? and ( p.ci = ? or  sl.num_historial = ?) and sl.estado = true and p.estado = true ORDER by sl.fecha_sol desc", [req.body.id, req.body.cinhc, req.body.cinhc],
        (err, rows) => {
            // console.log(rows, err)
            return res.json(rows)
        })
})




// ***************************************************************************************************************************************************************
// ***************************************************************************************************************************************************************
// ***************************************************************************************************************************************************************
// ***************************************************************************************************************************************************************
// ***************************************************************************************************************************************************************
// ***************************************************************************************************************************************************************

//CANTIDAD PARA EL ADMINISTRADOR DELSERVICIO
Solicitud.cantidadAadmin = errores(async (req, res) => {
    // console.log('se solicito a funcion cantidadA', req.body)
    pool.query('SELECT COUNT(sl.id) as cantidad from solex_lsss sl inner join area a on sl.id_area = a.id inner join unidad u on u.id = a.id_unidad inner join centro c on c.id = u.id_centro where c.id = ? and sl.validacion = 1 and sl.estado = true', [req.body.id],
        (err, rows) => {
            if (rows[0] !== 'undefined') {
                res.json({ 'a': rows[0].cantidad })
            }
        })
})

Solicitud.cantidadPadmin = errores(async (req, res) => {
    // console.log('se solicito a funcion cantidadP', req.body)
    pool.query('SELECT COUNT(sl.id) as cantidad from solex_lsss sl inner join area a on sl.id_area = a.id inner join unidad u on u.id = a.id_unidad inner join centro c on c.id = u.id_centro where c.id = ? and sl.validacion = 0 and sl.estado = true', [req.body.id],
        (err, rows) => {
            // console.log('filas Aceptados tamaño',rows[0])
            if (rows[0] !== 'undefined') {
                return res.json({ 'p': rows[0].cantidad })
            }
        })
})

Solicitud.cantidadRadmin = errores(async (req, res) => {
    // console.log('se solicito a funcion cantidadR', req.body)
    pool.query('SELECT COUNT(sl.id) as cantidad from solex_lsss sl inner join area a on sl.id_area = a.id inner join unidad u on u.id = a.id_unidad inner join centro c on c.id = u.id_centro where c.id = ? and sl.validacion = 2 and sl.estado = true', [req.body.id],
        (err, rows) => {
            // console.log('filas Aceptados tamaño',rows[0])
            if (rows[0] !== 'undefined') {
                return res.json({ 'r': rows[0].cantidad })
            }
        }
    )
})



// ver solicitud rol administracion
Solicitud.aadmin = errores(async (req, res) => {
    pool.query("SELECT sl.id,sl.validacion,sl.realizado, DATE_FORMAT(sl.fecha_sol, '%d/%m/%Y') as fecha_sol,sl.hora_sol, sl.diagnostico, sl.num_historial, concat(p.nombre,' ',p.apellido1,' ',p.apellido2) as paciente, sl.hora_toma_muestra, sl.hora_rec_sol, a.nombre as area, c.nombre as centroTarea from solex_lsss sl inner join paciente p on sl.id_paciente = p.id inner join area a on sl.id_area = a.id inner join area a2 on a2.id = sl.id_area_tarea inner join unidad u on u.id =a2.id_unidad inner join centro c on c.id = u.id_centro   where c.id = ? and sl.validacion = 1 and sl.estado = true and p.estado = true ORDER by sl.fecha_sol desc", [req.body.id],
        (err, solicitud) => {
            return res.json(solicitud)
        })
})

Solicitud.padmin = errores(async (req, res) => {
    pool.query("SELECT sl.id,sl.validacion,sl.realizado, DATE_FORMAT(sl.fecha_sol, '%d/%m/%Y') as fecha_sol,sl.hora_sol, sl.diagnostico, sl.num_historial, concat(p.nombre,' ',p.apellido1,' ',p.apellido2) as paciente, sl.hora_toma_muestra, sl.hora_rec_sol, a.nombre as area, c.nombre as centroTarea from solex_lsss sl inner join paciente p on sl.id_paciente = p.id inner join area a on sl.id_area = a.id inner join area a2 on a2.id = sl.id_area_tarea inner join unidad u on u.id =a2.id_unidad inner join centro c on c.id = u.id_centro   where c.id = ? and sl.validacion = 0 and sl.estado = true and p.estado = true ORDER by sl.fecha_sol desc", [req.body.id],
        (err, solicitud) => {
            return res.json(solicitud)
        })
})

Solicitud.radmin = errores(async (req, res) => {
    pool.query("SELECT sl.id,sl.validacion,sl.realizado, DATE_FORMAT(sl.fecha_sol, '%d/%m/%Y') as fecha_sol,sl.hora_sol, sl.diagnostico, sl.num_historial, concat(p.nombre,' ',p.apellido1,' ',p.apellido2) as paciente, sl.hora_toma_muestra, sl.hora_rec_sol, a.nombre as area, c.nombre as centroTarea from solex_lsss sl inner join paciente p on sl.id_paciente = p.id inner join area a on sl.id_area = a.id inner join area a2 on a2.id = sl.id_area_tarea inner join unidad u on u.id =a2.id_unidad inner join centro c on c.id = u.id_centro   where c.id = ? and sl.validacion = 2 and sl.estado = true and p.estado = true ORDER by sl.fecha_sol desc", [req.body.id],
        (err, solicitud) => {
            return res.json(solicitud)
        })
})

Solicitud.buscarSolicitudadmin = errores(async (req, res) => {
    // console.log(req.body)
    pool.query("SELECT sl.id,sl.validacion,sl.realizado, DATE_FORMAT(sl.fecha_sol, '%d/%m/%Y') as fecha_sol,sl.hora_sol, sl.diagnostico, sl.num_historial, concat(p.nombre,' ',p.apellido1,' ',p.apellido2) as paciente, sl.hora_toma_muestra, sl.hora_rec_sol, a.nombre as area, c.nombre as centroTarea from solex_lsss sl inner join paciente p on sl.id_paciente = p.id inner join area a on sl.id_area = a.id inner join area a2 on a2.id = sl.id_area_tarea inner join unidad u on u.id =a2.id_unidad inner join centro c on c.id = u.id_centro   where c.id = ? and ( p.ci = ? or  sl.num_historial = ?) and sl.estado = true and p.estado = true", [req.body.id, req.body.cinhc, req.body.cinhc],
        (err, rows) => {
            // console.log(rows, err)
            return res.json(rows)
        })
})

Solicitud.validacionAutorizar = errores(async (req, res) => {
    // console.log(req.body)
    pool.query("update solex_lsss set validacion = 1 where id = ?", [req.body.id], (err, rows) => {
        return res.send({ status: 1 })
    })
})

Solicitud.validacionRechazar = errores(async (req, res) => {
    // console.log(req.body)
    pool.query("update solex_lsss set validacion = 2 where id = ?", [req.body.id], (err, rows) => {
        return res.send({ status: 1 })
    })
})

Solicitud.especificoadmin = errores(async (req, res) => {
    // console.log(req.body)
    pool.query("SELECT concat(pe.nombre,' ',pe.apellido1,' ',pe.apellido2) as personal, a.nombre as area, un.nombre as unidad, ce.nombre as centro, m.nombre as municipio, r.nombre as red, sl.id,sl.validacion,sl.realizado, DATE_FORMAT(sl.fecha_sol, '%d/%m/%Y') as fecha_sol,sl.hora_sol , sl.hora_rec_sol, sl.diagnostico, sl.num_historial, p.id as idPaciente, concat(p.nombre,' ',p.apellido1,' ',p.apellido2) as paciente,p.ci, p.fechaNac, p.sexo, sl.hora_toma_muestra, sl.hora_rec_sol, c.id as idCentroTarea, c.nombre as centroTarea from solex_lsss sl inner join paciente p on sl.id_paciente = p.id inner join area a on sl.id_area = a.id inner join area a2 on a2.id = sl.id_area_tarea inner join unidad u on u.id =a2.id_unidad inner join centro c on c.id = u.id_centro inner join usuario us on us.id = sl.id_usuario inner join personal pe on pe.id = us.id_personal inner join unidad un on a.id_unidad = un.id inner join centro ce on ce.id = un.id_centro inner join distrito d on d.id = c.id_distrito inner join municipio m on m.id = d.id_municipio inner join reds r on r.id = m.id_red where sl.id = ? and  sl.estado = true and p.estado = true",
        [req.body.sol], (err, solicitud) => {
            // console.log(solicitud[0].id)
            if (solicitud[0] != null) {
                pool.query('SELECT s.id,s.nombre FROM solex_lsss sl INNER join seguros s on sl.id_seguro = s.id where sl.id = ?', [solicitud[0].id], (err, seguro) => {
                    pool.query('SELECT c.id as idCama, c.numero as numero, s.id as idSala, s.nombre as sala FROM solex_lsss sl inner join camas c on sl.id_cama = c.id inner join salas s on c.id_sala = s.id where sl.id = ?', [solicitud[0].id], (err, camaSala) => {
                        pool.query('SELECT ea.id as idExamen, ie.nombre as nombreExamen, e.nombre as grupo FROM solex_lsss sl inner join item_solicitud_laboratorio isl on sl.id = isl.id_solicitud_laboratorio inner join examen_area ea on isl.id_examen_laboratorio_area = ea.id inner join item_examen ie on ea.id_item_examen = ie.id inner join examen e on e.id = ie.id_examen where sl.id = ? and isl.estado = true',
                            [solicitud[0].id], (err, item) => {
                                let idSeguro, nombreSeguro, idCama, numero, idSala, sala = null
                                if (seguro[0] != null) {
                                    idSeguro = seguro[0].id
                                    nombreSeguro = seguro[0].nombre
                                }
                                if (camaSala[0] != null) {
                                    idCama = camaSala[0].idCama
                                    numero = camaSala[0].numero
                                    idSala = camaSala[0].idSala
                                    sala = camaSala[0].sala
                                }
                                // console.log(solicitud, seguro, camaSala, item)
                                return res.json({ 'solicitud': solicitud, 'idSeguro': idSeguro, 'seguro': nombreSeguro, 'idCama': idCama, 'numero': numero, 'idSala': idSala, 'sala': sala, 'item': item })
                            })
                    })
                })
            }
        })
})




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////// USUARIOS AREA DE SERVICIOS COMPLEMETARIOS/////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Solicitud.cantidadPservicios = errores(async (req, res) => {
    // console.log('se solicito a funcion cantidadP', req.body)
    pool.query('SELECT COUNT(sl.id) as cantidad from solex_lsss sl inner join area  a on sl.id_area_tarea = a.id inner join unidad u on u.id = a.id_unidad inner join centro c on c.id = u.id_centro where c.id = ? and sl.realizado = 0 and sl.validacion = 1 and sl.estado = true',
        [req.body.id], (err, rows) => {
            // console.log('filas Aceptados tamaño',rows[0])
            if (rows[0] !== 'undefined') {
                return res.json({ 'p': rows[0].cantidad })
            }
        })
})

Solicitud.cantidadRservicios = errores(async (req, res) => {
    // console.log('se solicito a funcion cantidadR', req.body)
    pool.query('SELECT COUNT(sl.id) as cantidad from solex_lsss sl inner join area  a on sl.id_area_tarea = a.id inner join unidad u on u.id = a.id_unidad inner join centro c on c.id = u.id_centro where c.id = ? and sl.realizado = 1 and sl.validacion = 1 and sl.estado = true',
        [req.body.id], (err, rows) => {
            // console.log('filas Aceptados tamaño',rows[0])
            if (rows[0] !== 'undefined') {
                return res.json({ 'r': rows[0].cantidad })
            }
        }
    )
})
Solicitud.Pservicios = errores(async (req, res) => {
    pool.query("SELECT sl.id,sl.validacion,sl.realizado, DATE_FORMAT(sl.fecha_sol, '%d/%m/%Y') as fecha_sol,sl.hora_sol, sl.diagnostico, sl.num_historial, concat(p.nombre,' ',p.apellido1,' ',p.apellido2) as paciente, sl.hora_toma_muestra, sl.hora_rec_sol, a.nombre as area, c.nombre as centroTarea from solex_lsss sl inner join paciente p on sl.id_paciente = p.id inner join area a on sl.id_area = a.id inner join area a2 on a2.id = sl.id_area_tarea inner join unidad u on u.id =a2.id_unidad inner join centro c on c.id = u.id_centro   where c.id = ? and sl.validacion = 1 and sl.realizado = 0  and sl.estado = true and p.estado = true ORDER by sl.fecha_sol desc",
        [req.body.id], (err, solicitud) => {
            return res.json(solicitud)
        })
})

Solicitud.Rservicios = errores(async (req, res) => {
    pool.query("SELECT sl.id,sl.validacion,sl.realizado, DATE_FORMAT(sl.fecha_sol, '%d/%m/%Y') as fecha_sol,sl.hora_sol, sl.diagnostico, sl.num_historial, concat(p.nombre,' ',p.apellido1,' ',p.apellido2) as paciente, sl.hora_toma_muestra, sl.hora_rec_sol, a.nombre as area, c.nombre as centroTarea from solex_lsss sl inner join paciente p on sl.id_paciente = p.id inner join area a on sl.id_area = a.id inner join area a2 on a2.id = sl.id_area_tarea inner join unidad u on u.id =a2.id_unidad inner join centro c on c.id = u.id_centro   where c.id = ? and sl.validacion = 1 and sl.realizado = 1 and sl.estado = true and p.estado = true ORDER by sl.fecha_sol desc",
        [req.body.id], (err, solicitud) => {
            return res.json(solicitud)
        })
})

Solicitud.realizado = errores(async (req, res) => {
    console.log(req.body)
    pool.query('select hora_rec_sol from solex_lsss where id= ? and estado = true', [req.body.id], (err, hrs) => {
        console.log(hrs[0])
        if (hrs[0].hora_rec_sol === null) {
            let hora = new Date().toLocaleTimeString()
            pool.query("update solex_lsss set realizado = 1, hora_rec_sol = ? where id = ?", [hora, req.body.id], (err, rows) => {
                return res.send({ status: 1 })
            })
        }
        else {
            pool.query("update solex_lsss set realizado = 1 where id = ?", [req.body.id], (err, rows) => {
                return res.send({ status: 1 })
            })
        }
    })
})




    Solicitud.especificoServicios = errores(async (req, res) => {
        // console.log(req.body.id)
        pool.query('select hora_rec_sol from solex_lsss where id= ? and estado = true', [req.body.id], (err, hrs) => {
            // console.log(hrs[0])
            if (hrs[0].hora_rec_sol === null) {
                // console.log('entro aqui')
                let hora = new Date().toLocaleTimeString()
                pool.query('update solex_lsss set hora_rec_sol = ? where id = ?', [hora, req.body.id], (err, update) => {
                    pool.query("SELECT concat(pe.nombre,' ',pe.apellido1,' ',pe.apellido2) as personal, a.nombre as area, un.nombre as unidad, ce.nombre as centro, m.nombre as municipio, r.nombre as red, sl.id,sl.validacion,sl.realizado, DATE_FORMAT(sl.fecha_sol, '%d/%m/%Y') as fecha_sol,sl.hora_sol , sl.hora_rec_sol, sl.diagnostico, sl.num_historial, p.id as idPaciente, concat(p.nombre,' ',p.apellido1,' ',p.apellido2) as paciente,p.ci, p.fechaNac, p.sexo, sl.hora_toma_muestra, sl.hora_rec_sol, c.id as idCentroTarea, c.nombre as centroTarea from solex_lsss sl inner join paciente p on sl.id_paciente = p.id inner join area a on sl.id_area = a.id inner join area a2 on a2.id = sl.id_area_tarea inner join unidad u on u.id =a2.id_unidad inner join centro c on c.id = u.id_centro inner join usuario us on us.id = sl.id_usuario inner join personal pe on pe.id = us.id_personal inner join unidad un on a.id_unidad = un.id inner join centro ce on ce.id = un.id_centro inner join distrito d on d.id = c.id_distrito inner join municipio m on m.id = d.id_municipio inner join reds r on r.id = m.id_red where sl.id = ? and  sl.estado = true and p.estado = true",
                        [req.body.id], (err, solicitud) => {
                            // console.log(solicitud[0].id)
                            if (solicitud[0] != null) {
                                pool.query('SELECT s.id,s.nombre FROM solex_lsss sl INNER join seguros s on sl.id_seguro = s.id where sl.id = ?', [solicitud[0].id], (err, seguro) => {
                                    pool.query('SELECT c.id as idCama, c.numero as numero, s.id as idSala, s.nombre as sala FROM solex_lsss sl inner join camas c on sl.id_cama = c.id inner join salas s on c.id_sala = s.id where sl.id = ?', [solicitud[0].id], (err, camaSala) => {
                                        pool.query('SELECT ea.id as idExamen, ie.nombre as nombreExamen, e.nombre as grupo FROM solex_lsss sl inner join item_solicitud_laboratorio isl on sl.id = isl.id_solicitud_laboratorio inner join examen_area ea on isl.id_examen_laboratorio_area = ea.id inner join item_examen ie on ea.id_item_examen = ie.id inner join examen e on e.id = ie.id_examen where sl.id = ? and isl.estado = true',
                                            [solicitud[0].id], (err, item) => {
                                                let idSeguro, nombreSeguro, idCama, numero, idSala, sala = 'SIN REGISTRO'
                                                if (seguro[0] != null) {
                                                    idSeguro = seguro[0].id
                                                    nombreSeguro = seguro[0].nombre
                                                }
                                                if (camaSala[0] != null) {
                                                    idCama = camaSala[0].idCama
                                                    numero = camaSala[0].numero
                                                    idSala = camaSala[0].idSala
                                                    sala = camaSala[0].sala
                                                }
                                                // console.log(solicitud)
                                                return res.json({ 'solicitud': solicitud, 'idSeguro': idSeguro, 'seguro': nombreSeguro, 'idCama': idCama, 'numero': numero, 'idSala': idSala, 'sala': sala, 'item': item })
                                            })
                                    })
                                })
                            }
                        })
                })
            }
            else {
                pool.query("SELECT concat(pe.nombre,' ',pe.apellido1,' ',pe.apellido2) as personal, a.nombre as area, un.nombre as unidad, ce.nombre as centro, m.nombre as municipio, r.nombre as red, sl.id,sl.validacion,sl.realizado, DATE_FORMAT(sl.fecha_sol, '%d/%m/%Y') as fecha_sol,sl.hora_sol , sl.hora_rec_sol, sl.diagnostico, sl.num_historial, p.id as idPaciente, concat(p.nombre,' ',p.apellido1,' ',p.apellido2) as paciente,p.ci, p.fechaNac, p.sexo, sl.hora_toma_muestra, sl.hora_rec_sol, c.id as idCentroTarea, c.nombre as centroTarea from solex_lsss sl inner join paciente p on sl.id_paciente = p.id inner join area a on sl.id_area = a.id inner join area a2 on a2.id = sl.id_area_tarea inner join unidad u on u.id =a2.id_unidad inner join centro c on c.id = u.id_centro inner join usuario us on us.id = sl.id_usuario inner join personal pe on pe.id = us.id_personal inner join unidad un on a.id_unidad = un.id inner join centro ce on ce.id = un.id_centro inner join distrito d on d.id = c.id_distrito inner join municipio m on m.id = d.id_municipio inner join reds r on r.id = m.id_red where sl.id = ? and  sl.estado = true and p.estado = true",
                    [req.body.id], (err, solicitud) => {
                        // console.log(solicitud[0].id)
                        if (solicitud[0] != null) {
                            pool.query('SELECT s.id,s.nombre FROM solex_lsss sl INNER join seguros s on sl.id_seguro = s.id where sl.id = ?', [solicitud[0].id], (err, seguro) => {
                                pool.query('SELECT c.id as idCama, c.numero as numero, s.id as idSala, s.nombre as sala FROM solex_lsss sl inner join camas c on sl.id_cama = c.id inner join salas s on c.id_sala = s.id where sl.id = ?', [solicitud[0].id], (err, camaSala) => {
                                    pool.query('SELECT ea.id as idExamen, ie.nombre as nombreExamen, e.nombre as grupo FROM solex_lsss sl inner join item_solicitud_laboratorio isl on sl.id = isl.id_solicitud_laboratorio inner join examen_area ea on isl.id_examen_laboratorio_area = ea.id inner join item_examen ie on ea.id_item_examen = ie.id inner join examen e on e.id = ie.id_examen where sl.id = ? and isl.estado = true',
                                        [solicitud[0].id], (err, item) => {
                                            let idSeguro, nombreSeguro, idCama, numero, idSala, sala = null
                                            if (seguro[0] != null) {
                                                idSeguro = seguro[0].id
                                                nombreSeguro = seguro[0].nombre
                                            }
                                            if (camaSala[0] != null) {
                                                idCama = camaSala[0].idCama
                                                numero = camaSala[0].numero
                                                idSala = camaSala[0].idSala
                                                sala = camaSala[0].sala
                                            }
                                            // console.log(solicitud)
                                            return res.json({ 'solicitud': solicitud, 'idSeguro': idSeguro, 'seguro': nombreSeguro, 'idCama': idCama, 'numero': numero, 'idSala': idSala, 'sala': sala, 'item': item })
                                        })
                                })
                            })
                        }
                    })

            }
        })

    })



    module.exports = Solicitud