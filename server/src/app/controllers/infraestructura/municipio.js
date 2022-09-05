const pool = require('../../../../BD/bd1')
let errores = require('../errores')


const municipio = {}

 municipio.lista = errores(async (req, res) => {

    // console.log("mi lista", req.body)
    pool.query('SELECT * FROM municipio where estado = true',
        (err, rows) => {

            if (err) {

                return res.send({ status: 2 })
            }

            return res.json(rows)
        })
})
 municipio.buscar = errores(async (req, res) => {

    console.log(req.body, 'datos desde el cliente')
    pool.query('SELECT * FROM municipio WHERE nombre = ? and estado = true', [req.body.nombre], (err, rows) => {

        if (err) {  return res.send({ status: 2 }) }

        if (rows[0] != null) {

            return res.json(rows)

        } else {

            return res.send({ status: 7 })

        }
    })

})

 municipio.registro = errores(async (req, res) => {

    // console.log(req.body.nombre)
    pool.query('SELECT nombre FROM municipio where nombre = ? and id_red', [req.body.nombre, req.body.idRed], (err, rows) => {

        if (err) { return res.send({ status: 2 }) }

        if (rows[0] != null) {
            // console.log(rows[0], 'datos con el mismo nombre')
            return res.send({ status: 3 })

        }
        else {
            pool.query('INSERT INTO municipio set nombre =  ?, id_red = ?, estado = true', [req.body.nombre, req.body.idRed], (err, rows) => {

                if (err) { return res.send({ status: 2 }) }
                return res.send({ status: 1 })
                // console.log('se inserto')
            })
        }
    })
})

 municipio.update = errores(async (req, res) => {
    pool.query('SELECT nombre FROM municipio WHERE nombre = ? and id_red = ? ', [req.body.nombre, req.body.idRed], (err, rows) => {

        if (err) { res.send({ status: 2 }) }
        if (rows[0] != null) {
            return res.send({ status: 3 })
        }
        else {
            pool.query('UPDATE municipio set nombre = ?, id_red = ? WHERE id = ?', [req.body.nombre, req.body.idRed, req.body.id], (err, rows) => {
                if (err) { return res.send({ status: 2 }) }
                return  res.send({ status: 1 })
            })
        } 
    })
})

 municipio.delete = errores(async (req, res) => {

    console.log('pasa ultima tranzacion eliminar')

    pool.query('SELECT * FROM municipio where id = ?', [req.body.id], (err, rows) => {
        if (err) { return res.send({ status: 2 }) }

        if (rows[0] != null) {

            // console.log(rows[0].id,' el id')

            pool.query('UPDATE municipio set estado = false WHERE id = ?', [ req.body.id], (err, rows) => {
                if (err) { return res.send({ status: 2 }) }
                return res.json({ status: 1 })
            })
        }
        else {
            return res.json({ status: 7 })
        }
    })
})



module.exports = municipio
