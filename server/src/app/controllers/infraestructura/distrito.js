const pool = require('../../../../BD/bd1')
let errores = require('../errores')


const distrito = {}

 distrito.lista = errores(async (req, res) => {

    // console.log("mi lista", req.body)
    pool.query('SELECT * FROM distrito where estado = true',
        (err, rows) => {

            if (err) {

                return res.send({ status: 2 })
            }

            return res.json(rows)
        })
})
 distrito.buscar = errores(async (req, res) => {

    console.log(req.body, 'datos desde el cliente')
    pool.query('SELECT * FROM distrito WHERE nombre = ? and estado = true', [req.body.nombre], (err, rows) => {

        if (err) {  return res.send({ status: 2 }) }

        if (rows[0] != null) {

            return res.json(rows)

        } else {

            return res.send({ status: 7 })

        }
    })

})

 distrito.registro = errores(async (req, res) => {

    // console.log(req.body.nombre)
    pool.query('SELECT nombre FROM distrito where nombre = ? and id_municipio= ?', [req.body.nombre, req.body.idMunicipio], (err, rows) => {

        if (err) { return res.send({ status: 2 }) }

        if (rows[0] != null) {
            // console.log(rows[0], 'datos con el mismo nombre')
            return res.send({ status: 3 })

        }
        else {
            pool.query('INSERT INTO distrito set nombre =  ?, id_municipio = ?, estado = true', [req.body.nombre, req.body.idMunicipio], (err, rows) => {

                if (err) { return res.send({ status: 2 }) }
                return res.send({ status: 1 })
                // console.log('se inserto')
            })
        }
    })
})

 distrito.update = errores(async (req, res) => {
    pool.query('SELECT nombre FROM distrito WHERE nombre = ? and id_municipio = ? ', [req.body.nombre, req.body.idMunicipio], (err, rows) => {

        if (err) { res.send({ status: 2 }) }
        if (rows[0] != null) {
            return res.send({ status: 3 })
        }
        else {
            pool.query('UPDATE distrito set nombre = ?, id_municipio = ? WHERE id = ?', [req.body.nombre, req.body.idMunicipio, req.body.id], (err, rows) => {
                if (err) { return res.send({ status: 2 }) }
                return  res.send({ status: 1 })
            })
        } 
    })
})

 distrito.delete = errores(async (req, res) => {

    console.log('pasa ultima tranzacion eliminar')

    pool.query('SELECT * FROM distrito where id = ?', [req.body.id], (err, rows) => {
        if (err) { return res.send({ status: 2 }) }

        if (rows[0] != null) {

            // console.log(rows[0].id,' el id')

            pool.query('UPDATE distrito set estado = false WHERE id = ?', [ req.body.id], (err, rows) => {
                if (err) { return res.send({ status: 2 }) }
                return res.json({ status: 1 })
            })
        }
        else {
            return res.json({ status: 7 })
        }
    })
})



module.exports = distrito
