
// las diferentes tareas se realizan de manera asincrona con async:asincrona
// y await:esperar


//manejador  de errores
function errores(collback){
    return async (req, res)=>{
        try {
            await collback(req, res)
        } catch (error) {
            throw error;
            // console.log('error en la operacion: ',error)
            // return
        }
    }
}

module.exports = errores;