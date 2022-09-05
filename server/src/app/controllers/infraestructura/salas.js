const pool = require('../../../../BD/bd1')
let errores = require('../errores')


const salas = {}


salas.lista = errores(async (req, res) => {

    // console.log("mi lista", req.body)
    pool.query('SELECT * FROM salas where estado = true',
        (err, rows) => {

            if (err) {

                return res.send({ status: 2 })
            }

            return res.json(rows)
        })
})

salas.buscar = errores(async (req, res) => {

    console.log(req.body, 'datos desde el cliente')
    pool.query('SELECT * FROM salas WHERE nombre = ? and estado = true', [req.body.nombre], (err, rows) => {

        if (err) {  return res.send({ status: 2 }) }

        if (rows[0] != null) {

            return res.json(rows)

        } else {

            return res.send({ status: 7 })

        }
    })

})


salas.registro = errores(async (req, res) => {

    // console.log(req.body.nombre)
    pool.query('SELECT nombre FROM salas where nombre = ? and id_area= ?', [req.body.nombre, req.body.idArea ], (err, rows) => {

        if (err) { return res.send({ status: 2 }) }

        if (rows[0] != null) {
            // console.log(rows[0], 'datos con el mismo nombre')
            return res.send({ status: 3 })

        }
        else {
            pool.query('INSERT INTO salas set nombre =  ?, id_area = ?, estado = true', [req.body.nombre, req.body.idArea], (err, rows) => {

                if (err) { return res.send({ status: 2 }) }
                return res.send({ status: 1 })
                // console.log('se inserto')
            })
        }
    })
})


salas.update = errores(async (req, res) => {
    pool.query('SELECT nombre FROM salas WHERE nombre = ? ', [req.body.nombre], (err, rows) => {

        if (err) { res.send({ status: 2 }) }
        if (rows[0] != null) {
            return res.send({ status: 3 })
        }
        else {
            pool.query('UPDATE salas set nombre = ?, id_area = ? WHERE id = ?', [req.body.nombre, req.body.idArea, req.body.id], (err, rows) => {
                if (err) { return res.send({ status: 2 }) }
                return  res.send({ status: 1 })
            })
        } 
    })
})


salas.delete = errores(async (req, res) => {

    console.log('pasa ultima tranzacion eliminar')

    pool.query('SELECT * FROM salas where id = ?', [req.body.id], (err, rows) => {
        if (err) { return res.send({ status: 2 }) }

        if (rows[0] != null) {

            // console.log(rows[0].id,' el id')

            pool.query('UPDATE salas set estado = ? WHERE id = ?', [req.body.estado, req.body.id], (err, rows) => {
                if (err) { return res.send({ status: 2 }) }
                return res.json({ status: 1 })
            })
        }
        else {
            return res.json({ status: 7 })
        }
    })
})



module.exports = salas
