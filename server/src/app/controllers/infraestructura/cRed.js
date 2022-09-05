const pool = require('../../../../BD/bd1')
let errores = require('../errores')


const redes = {}



redes.lista = errores(async (req, res) => {

    pool.query('SELECT * FROM reds', (err, rows) => {
        
        if (err) { return res.send({ status: 2 }) }
        // console.log("hasta aqui")
        return  res.json(rows)
        
    })

})



redes.buscar = errores(async (req, res) => {

    console.log(req.body, 'datos desde el cliente')
    pool.query('SELECT * FROM reds WHERE nombre = ?', [req.body.nombre], (err, rows) => {

        if (err) {  return res.send({ status: 2 }) }

        if (rows[0] != null) {

            return res.json(rows)

        } else {

            return res.send({ status: 7 })

        }
    })

})


redes.registro = errores(async (req, res) => {

    // console.log(req.body.nombre)
    pool.query('SELECT nombre FROM reds where nombre = ?', [req.body.nombre], (err, rows) => {

        if (err) { return res.send({ status: 2 }) }

        if (rows[0] != null) {
            // console.log(rows[0], 'datos con el mismo nombre')
            return res.send({ status: 3 })

        }
        else {
            pool.query('INSERT INTO reds set nombre =  ?', [req.body.nombre], (err, rows) => {

                if (err) { return res.send({ status: 2 }) }
                return res.send({ status: 1 })
                // console.log('se inserto')
            })
        }
    })
})


redes.update = errores(async (req, res) => {
    pool.query('SELECT nombre FROM reds WHERE nombre = ? ', [req.body.nombre], (err, rows) => {

        if (err) { res.send({ status: 2 }) }
        if (rows[0] != null) {
            return res.send({ status: 3 })
        }
        else {
            pool.query('UPDATE reds set nombre = ? WHERE id = ?', [req.body.nombre, req.body.id], (err, rows) => {
                if (err) { return res.send({ status: 2 }) }
                return  res.send({ status: 1 })
            })
        } 
    })
})


redes.delete = errores(async (req, res) => {

    console.log('pasa ultima tranzacion eliminar')

    pool.query('SELECT * FROM reds where id = ?', [req.body.id], (err, rows) => {
        if (err) { return res.send({ status: 2 }) }

        if (rows[0] != null) {

            // console.log(rows[0].id,' el id')

            pool.query('DELETE FROM reds WHERE id = ?', [req.body.id], (err, rows) => {
                if (err) { return res.send({ status: 2 }) }
                return res.json({ status: 1 })
            })
        }
        else {
            return res.json({ status: 7 })
        }
    })
})

module.exports = redes