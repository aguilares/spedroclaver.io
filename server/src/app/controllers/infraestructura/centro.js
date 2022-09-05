const pool = require('../../../../BD/bd1')
let errores = require('../errores')


const centro = {}

 centro.lista = errores(async (req, res) => {

    // console.log("mi lista", req.body)
    pool.query('SELECT * FROM centro where estado = true',
        (err, rows) => {

            if (err) {

                return res.send({ status: 2 })
            }

            return res.json(rows)
        })
})
 centro.buscar = errores(async (req, res) => {

    console.log(req.body, 'datos desde el cliente')
    pool.query('SELECT * FROM centro WHERE nombre = ? and estado = true', [req.body.nombre], (err, rows) => {

        if (err) {  return res.send({ status: 2 }) }

        if (rows[0] != null) {

            return res.json(rows)

        } else {

            return res.send({ status: 7 })

        }
    })

})

 centro.registro = errores(async (req, res) => {

    // console.log(req.body.nombre)
    pool.query('SELECT nombre FROM centro where nombre = ? and id_distrito = ?', [req.body.nombre,req.body.idDistrito], (err, rows) => {

        if (err) { return res.send({ status: 2 }) }

        if (rows[0] != null) {
            // console.log(rows[0], 'datos con el mismo nombre')
            return res.send({ status: 3 })

        }
        else {
            pool.query('INSERT INTO centro set nombre =  ?, id_distrito = ?, estado = true', [req.body.nombre, req.body.idDistrito], (err, rows) => {

                if (err) { return res.send({ status: 2 }) }
                return res.send({ status: 1 })
                // console.log('se inserto')
            })
        }
    })
})

 centro.update = errores(async (req, res) => {
    pool.query('SELECT nombre FROM centro WHERE nombre = ? and id_distrito = ? ', [req.body.nombre, req.body.idDistrito], (err, rows) => {

        if (err) { res.send({ status: 2 }) }
        if (rows[0] != null) {
            return res.send({ status: 3 })
        }
        else {
            pool.query('UPDATE centro set nombre = ?, id_distrito = ? WHERE id = ?', [req.body.nombre, req.body.idDistrito, req.body.id], (err, rows) => {
                if (err) { return res.send({ status: 2 }) }
                return  res.send({ status: 1 })
            })
        } 
    })
})

 centro.delete = errores(async (req, res) => {

    console.log('pasa ultima tranzacion eliminar')

    pool.query('SELECT * FROM centro where id = ?', [req.body.id], (err, rows) => {
        if (err) { return res.send({ status: 2 }) }

        if (rows[0] != null) {

            // console.log(rows[0].id,' el id')

            pool.query('UPDATE centro set estado = false WHERE id = ?', [ req.body.id], (err, rows) => {
                if (err) { return res.send({ status: 2 }) }
                return res.json({ status: 1 })
            })
        }
        else {
            return res.json({ status: 7 })
        }
    })
})



module.exports = centro
