const pool = require('../../../../BD/bd1')
let errores = require('../errores')



const cPaciente = {}


cPaciente.miLista = errores(async (req, res) => {

    // console.log("mi lista", req.body)
    pool.query('SELECT p.id, p.ci as ci, p.nombre as nombre, p.apellido1 as apellidoPat, p.apellido2 as apellidoMat, p.sexo, DATE_FORMAT(p.fechaNac, "%d/%m/%Y") as fechaNac, p.celular as celular, p.direccion as direccion, r.id as idRed, r.nombre as red, p.telefono as telefono, p.validacion as validacion, p.estado as estado, u.id as idPersonal FROM sesiones se inner join usuario u on se.id_user = u.id inner join paciente p on p.idPersonal = u.id INNER join reds r on p.id_red = r.id WHERE se.token = ? and p.id BETWEEN (SELECT MAX(id) from paciente)-? and (SELECT MAX(id) from paciente)-? AND p.estado = true ', [req.body.token, req.body.limite, req.body.inicio],
        (err, rows) => {

            if (err) {

                return res.send({ status: 2 })
            }

            return res.json(rows)
        })
})

cPaciente.lista = errores(async (req, res) => {


    // console.log('dato desde el cliente : ',req.body)
    pool.query('SELECT p.id, p.ci as ci, p.nombre as nombre, p.apellido1 as apellidoPat, p.apellido2 as apellidoMat, p.sexo, DATE_FORMAT(p.fechaNac, "%d/%m/%Y") as fechaNac, p.celular as celular, p.direccion as direccion,  r.id as idRed, r.nombre as red, p.telefono as telefono, p.validacion as validacion, p.estado as estado FROM paciente p inner join reds r on p.id_red = r.id  where p.id BETWEEN (SELECT MAX(id) from paciente)-? and (SELECT MAX(id) from paciente)-? AND p.estado = true ', [req.body.limite, req.body.inicio],
        (err, rows) => {

            if (err) { return res.send({ status: 2 }) }

            return res.json(rows)
        })
})

cPaciente.buscar = errores(async (req, res) => {

    console.log('controller buscar: ', req.body.ci)
    pool.query('SELECT p.id, p.ci as ci, p.nombre as nombre, p.apellido1 as apellidoPat, p.apellido2 as apellidoMat, p.sexo, DATE_FORMAT(p.fechaNac, "%d/%m/%Y") as fechaNac, p.celular as celular, p.direccion as direccion,  r.id as idRed, r.nombre as red, p.telefono as telefono, p.validacion as validacion, p.estado as estado, p.idPersonal as idPersonal FROM paciente p inner join reds r on p.id_red = r.id  where  p.ci = ? and  p.estado = true', [req.body.ci], (err, rows) => {

        if (err) { return res.send({ status: 2 }) }

        if (rows[0] != null) {

            // console.log(rows)
            return res.json(rows)

        }
        console.log("no hay datos")
    })
})


cPaciente.registro = errores(async (req, res) => {

    // console.log(req.body, 'llega al controlador')
    pool.query('SELECT ci FROM paciente where ci = ?', [req.body.ci], (err, rows) => {

        if (err) { return res.send({ status: 2 }) }

        if (rows[0] != null) {
            // console.log(rows[0], 'datos con el mismo nombre')
            return res.send({ status: 3 })

        }
        else {
            let telef = ''
            const ci = req.body.ci
            const nombre = req.body.nombre
            const apellido1 = req.body.apellido1
            const apellido2 = req.body.apellido2
            const sexo = req.body.sexo
            const fechaNac = req.body.fechaNac
            const celular = req.body.celular
            if (req.body.telef === '') {
                telef = '0000'
            } else {
                telef = req.body.telef
            }
            const direccion = req.body.direccion
            const id_red = req.body.reds
            const idUsuario = req.body.id
            // const validacion = false
            // console.log(fechaNac.toISOString().split('T')[0], 'fecha formateado')
            console.log(ci, nombre, apellido1, apellido2, sexo, fechaNac, celular, telef, direccion, id_red, idUsuario)
            pool.query('INSERT INTO paciente set ci=  ?, nombre = ?, apellido1 = ?, apellido2 = ?, sexo = ?, fechaNac = ?, celular = ?, telefono = ?,  direccion = ?, id_red = ?, validacion = ?, estado = ?, idPersonal = ? ',
                [ci, nombre, apellido1, apellido2, sexo, fechaNac, celular, telef, direccion, id_red, false, true, idUsuario], (err, rows) => {

                    if (err) {

                        console.log('error al insertar')
                        return res.send({ status: 2 })
                    }
                    return res.send({ status: 1 })
                    // console.log('se inserto')
                })
        }
    })
})


cPaciente.update = errores(async (req, res) => {

    // console.log('datos del paciete: ', req.body)
    pool.query('SELECT id FROM paciente WHERE id = ? ', [req.body.id], (err, rows) => {

        if (err) { return res.send({ status: 2 }) }
        if (rows[0] != null) {

            pool.query('SELECT ci FROM paciente WHERE ci = ?', [req.body.ci], (err1, rows1) => {
                if (err1) { return res.send({ status: 2 }) }
                if (rows1[0] == null) {

                    pool.query('UPDATE paciente set ci = ?, nombre = ?, apellido1 = ?, apellido2 = ?, sexo=?, celular=?, fechaNac=?, telefono=?, direccion=?, id_red=?, validacion = ?, estado=?, idPersonal=?  WHERE id = ?',
                        [req.body.ci, req.body.nombre, req.body.apellido1, req.body.apellido2, req.body.sexo, req.body.celular, req.body.fechaNac, req.body.telefono, req.body.direccion, req.body.id_red, req.body.validacion, req.body.estado, req.body.idPersonal, req.body.id], (err, rows) => {
                            if (err) { return res.send({ status: 2 }) }
                            return res.send({ status: 1 })
                        })
                }
                else {
                    return res.send({ status: 3 })
                }
            })
        }
        else {
            return res.send({ estatus: 7 })
        }

    })
})


cPaciente.delete = errores(async (req, res) => {


    console.log('pasa ultima tranzacion eliminar', req.body)

    pool.query('SELECT * FROM paciente where id = ?', [req.body.id], (err, rows) => {
        if (err) { return res.send({ status: 2 }) }

        if (rows[0] != null) {

            // console.log(rows[0].id,' el id')

            pool.query('update paciente set estado = 0 WHERE id = ?', [req.body.id], (err, rows) => {
                if (err) { return res.send({ status: 2 }) }
                return res.json({ status: 1 })
            })
        }
        else {
            return res.json({ status: 7 })
        }
    })
})

module.exports = cPaciente
