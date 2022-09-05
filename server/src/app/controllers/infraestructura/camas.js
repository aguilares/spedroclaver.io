const pool = require('../../../../BD/bd1')
let errores = require('../errores')



const camas = {}


camas.lista = errores(async (req, res) => {

    // console.log("mi lista", req.body)
    pool.query('SELECT * FROM camas where estado = true',
        (err, rows) => {

            if (err) {

                return res.send({ status: 2 })
            }

            return res.json(rows)
        })
})

camas.buscar = errores(async (req, res) => {

    console.log(req.body, 'datos desde el cliente')
    pool.query('SELECT * FROM camas WHERE nombre = ? and estado = true', [req.body.nombre], (err, rows) => {

        if (err) {  return res.send({ status: 2 }) }

        if (rows[0] != null) {

            return res.json(rows)

        } else {

            return res.send({ status: 7 })

        }
    })

})


camas.registro = errores(async (req, res) => {

    // console.log(req.body.nombre)
    pool.query('SELECT nombre FROM camas where nombre = ? and id_sala = ?', [req.body.nombre,req.body.idSala], (err, rows) => {

        if (err) { return res.send({ status: 2 }) }

        if (rows[0] != null) {
            // console.log(rows[0], 'datos con el mismo nombre')
            return res.send({ status: 3 })

        }
        else {
            pool.query('INSERT INTO camas set nombre =  ?, id_sala = ?, estado = true', [req.body.nombre, req.body.idSala], (err, rows) => {

                if (err) { return res.send({ status: 2 }) }
                return res.send({ status: 1 })
                // console.log('se inserto')
            })
        }
    })
})


camas.update = errores(async (req, res) => {
    pool.query('SELECT nombre FROM camas WHERE nombre = ? and id_sala ', [req.body.nombre,req.body.idSala], (err, rows) => {

        if (err) { res.send({ status: 2 }) }
        if (rows[0] != null) {
            return res.send({ status: 3 })
        }
        else {
            pool.query('UPDATE camas set nombre = ?, id_sala = ? WHERE id = ?', [req.body.nombre, req.body.idSala, req.body.id], (err, rows) => {
                if (err) { return res.send({ status: 2 }) }
                return  res.send({ status: 1 })
            })
        } 
    })
})


camas.delete = errores(async (req, res) => {

    console.log('pasa ultima tranzacion eliminar')

    pool.query('SELECT * FROM camas where id = ?', [req.body.id], (err, rows) => {
        if (err) { return res.send({ status: 2 }) }

        if (rows[0] != null) {

            // console.log(rows[0].id,' el id')

            pool.query('UPDATE camas set estado = false WHERE id = ?', [req.body.id], (err, rows) => {
                if (err) { return res.send({ status: 2 }) }
                return res.json({ status: 1 })
            })
        }
        else {
            return res.json({ status: 7 })
        }
    })
})



module.exports = camas
