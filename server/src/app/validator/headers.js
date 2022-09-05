const { validationResult } = require('express-validator');

const validaciones = (req, res, next) => {
    try {

        // console.log(req.body)
        validationResult(req).throw()
        // console.log("pasa validadiones")
        return next()

    } catch (error) {
        console.log('no pasa validadciones')

        return res.send({ status: 5 })
    }
}
module.exports = { validaciones }