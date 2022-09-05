
const jwt = require('jsonwebtoken')

const express = require('express')
const errores = require('../app/controllers/errores')


//clave de cifrado
const clave = require("../../settings/keys")
// const app = express()
// app.set('clave', clave.key)

//IMPORTACION DE LAS RUTAS
const pool = require('../../BD/bd1')
const rutas = express()

const paciente = require('./cliente/rPaciente')

// INFRAESTRUCTURA
const red = require('./infraestructura/rRed')
const area = require('./infraestructura/area')
const camas = require('./infraestructura/camas')
const centro = require('./infraestructura/centro')
const distrito = require('./infraestructura/distrito')
const municipio = require('./infraestructura/municipio')
const salas = require('./infraestructura/salas')
const unidad = require('./infraestructura/unidad')

// SERVICIOS
//COMPLEMENTARIOS
const solicitud = require('./../routes/servicios/complementarios/solicitud')



// importamos la configuracion de conexion de la bd



// ruta de autentidicacion
rutas.post('/', errores(async (req, res) => {

    var d = new Date();
    let fecha = d.toISOString().split('T')[0] + ' ' + d.toTimeString().split(' ')[0];
    // console.log("mi solicitud: ", req.body.user , req.body.pass)
    pool.query('SELECT u.id as id, u.usuario as usuario, s.nombre as sistema from usuario u inner join user_sist us on u.id=us.idUser inner join sistema s on us.idSist = s.id  WHERE u.usuario = ? and u.pass = ? and u.estado= 1', [req.body.user, req.body.pass], (err, rows) => {
        if (err) { return res.send({ status: 2, mensaje: 'error en a consulta' }) }

        // console.log("datos de la base de datos: ",rows)
        if (rows.length > 0) {
            // console.log("sin informacion", rows)
            pool.query('SELECT * FROM sesiones where id_user = ?', [rows[0].id], (errr, rowss) => {
                if (errr) { return res.send({ status: 2 }) }
                // console.log(rowss[0], 'id sesion')
                if (rows.length > 0) {

                    pool.query('delete from sesiones where id_user = ?', [rows[0].id], (error, rowseliminar) => {
                        if (error) {
                            return res.send({ status: 2 })
                        }
                    })
                    const payload = {

                        "usuario": rows[0].usuario,
                        "sistema": rows[0].sistema,
                    }
                    const token = jwt.sign(payload, clave.key, {
                        expiresIn: "1d"
                    })
                    // console.log('datos para el cliente', rows)
                    pool.query('INSERT INTO sesiones set ?', [{ "id_user": [rows[0].id], "fecha": fecha, "token": token }], (err_insert, rowsss) => {
                        if (err_insert) { return res.send({ status: 2 }) }
                    })

                    return res.json({
                        "token": token,
                    })

                } else {
                    const payload = {

                        "usuario": rows[0].usuario,
                        "sistema": rows[0].sistema,
                    }
                    const token = jwt.sign(payload, clave.key, {
                        expiresIn: "1d"
                    })
                    pool.query('INSERT INTO sesiones set ?', [{ "id_user": [rows[0].id], "fecha": fecha, "token": token }], (err_insert, rowsss) => {
                        if (err_insert) { return res.send({ status: 2 }) }
                    })
                    return res.json({
                        "token": token,

                    })
                }
            })
        }
        else {
            return res.send({ status: 6, mensaje: 'error, inicio de sesion' })
        }
    })
}))

//CERRAR SESION EN LA BASE DE DATOS
rutas.post('/logout', errores(async (req, res) => {
    // console.log("eliminar a :", req.body.user)
    pool.query('DELETE FROM sesiones where token = ? ', [req.body.token])
}))

// obtener sesion desde la base de datos
rutas.post('/token', errores(async (req, res) => {
    // console.log("se solicito  a la ruta token")

    // console.log("ha llegado la solicitud verificacion de los persmisos del usuario:", req.body.token)
    pool.query('SELECT u.usuario as usuario, concat(UPPER(left(p.nombre,1)),LOWER(SUBSTRING(p.nombre,2))) as nombre, concat(UPPER(left(p.apellido1,1)),LOWER(SUBSTRING(p.apellido1,2))) as apellido1, concat(UPPER(left(p.apellido2,1)),LOWER(SUBSTRING(p.apellido2,2))) as apellido2, u.id as id, u.usuario as usuario, s.nombre as sistema, n.nivel as nivel, r.numero as rol, r.nombre as nombre_rol, a.id as idArea, a.nombre as area, un.id as idUnidad, un.nombre as unidad, c.id as idCentro, c.nombre as centro, d.id as idDistrito, d.nombre as distrito, m.id as idMunicipio, m.nombre as municipio, re.id as idRed, re.nombre as red from sesiones se inner join usuario u on se.id_user = u.id inner join user_sist us on us.idUser = u.id inner join sistema s on us.idSist = s.id inner join nivel n on u.id_nivel = n.id inner join rol r on u.id_rol = r.id inner join personal p on p.id = u.id_personal inner join area a on p.id_area = a.id inner join unidad un on a.id_unidad = un.id inner join centro c on un.id_centro=c.id inner join distrito d on c.id_distrito = d.id inner join municipio m on d.id_municipio = m.id inner join reds re on m.id_red = re.id  where se.token = ? and u.estado = true and p.estado = true and a.estado = true and  u.estado = true and c.estado = true and d.estado = true and m.estado = true', [req.body.token], (err, rows) => {
        if (err) {
            return res.send({ status: 6, mensaje: 'no existe el token' })
        }
        // console.log("datos del rows: ",rows)
        if (rows.length > 0) {

            // console.log(rows)
            return res.json({ "personal": rows[0].nombre, "apellido1": rows[0].apellido1, "apellido2": rows[0].apellido2, "id": rows[0].id, "usuario": rows[0].usuario,"sistema":rows[0].sistema, "nivel": rows[0].nivel, "rol": rows[0].rol, 'nombre_rol':rows[0].nombre_rol, "idArea": rows[0].idArea, "area": rows[0].area, "idUnidad": rows[0].idUnidad, "unidad": rows[0].unidad, "idCentro": rows[0].idCentro, "centro": rows[0].centro, 'idDistrito':rows[0].idDistrito, 'distrito':rows[0].distrito, 'idMunicipio':rows[0].idMunicipio,'municipio':rows[0].municipio, 'idRed':rows[0].idRed, 'red':rows[0].red })
        }
        else {
            return res.send({ status: 6, mensaje: 'no existe el token' })
        }
    })
}))



//VERIFICACION DE LA SESION QUE ESTA ALMACENADA EN LA BD

const verificacion = express();


verificacion.use((err, req, res, next) => {

    console.log("en verificacion del servidor : ", req.body)
    if (err) {
        res.status(500).send('error del servidor')
    }
    console.log("en verificacion del servidor : ", req.body)

    const user = req.body.token
    const bearerHeader = req.headers['authorization'];
    // console.log("chuquisaca va a clasificar otra ves ", bearerHeader )

    if (typeof bearerHeader !== 'undefined') {
        const bearetoken = bearerHeader.split(" ")[1];

        jwt.verify(bearetoken, clave.key, (errtoken, authData) => {
            if (errtoken) {

                if (user !== null) {
                    // console.log(user, bearetoken)
                    pool.query('delete from sesiones where token = ?', [user], (error, rowss) => {
                        return res.send({ status: 6, message: 'Sesion destruida, token no valido' })
                    })
                } else {
                    return res.send({ status: 6, message: 'error, token no valido' })
                }
                // console.log('token no valido')
            }
            // else {
            // console.log('token valido puessss')
            if (user !== null) {
                pool.query('SELECT * FROM sesiones WHERE token = ?', [user], (err, rows) => {

                    if (rows.length > 0) {
                        next()
                    } else {
                        // console.log("fallllooooooooooos")
                        return res.send({ status: 6, mensaje: "error, inicie sesion nuevamente" })
                    }
                })
            } else {
                return res.send({ status: 6, mensaje: "error al obtener sesion" })
            }
            // }
        })

    }
    else {
        return res.send({ status: 6, mensaje: "error al obtener sesion" })
    }
})


//TODAS LAS RUTAS DEL API REST
// LAS SIGUIENTES RUTAS CUENTAN CON LA PROTECION DE DATOS, 
rutas.use('/pacientes', verificacion, paciente)
rutas.use('/red', verificacion, red)

rutas.use('/centro', verificacion, centro)
rutas.use('/distrito', verificacion, distrito)
rutas.use('/camas', verificacion, camas)
rutas.use('/municipio', verificacion, municipio)
rutas.use('/area', verificacion, area)
rutas.use('/salas', verificacion, salas)
rutas.use('/unidad', verificacion, unidad)

//SERVICIOS COMPLEMENTARIOS
rutas.use('/servicioscompl', verificacion, solicitud)


module.exports = rutas