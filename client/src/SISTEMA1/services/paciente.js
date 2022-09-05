import axios from 'axios'
import url, { red } from '../../Auth/varEntorno'



//peticiones al servidor


const HttpPaciente = async (n, auth, ci = '', nombre = '', apellidoPat = '', apellidoMat = '', sexo = '', fechaNac = '', celular = '', telef = '', direccion = '', reds = '', idUsuario = '', id = '', validacion = '', estado = '', inicio = 0, limite = 0) => {

    const token = localStorage.getItem("token")


    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },

        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )



    if (token != null) {
        // insertar registro
        if (n === 2) {

            // console.log(" datos en el servicio insertar: ", 'ci:',ci, 'nombre:', nombre, apellidoPat, apellidoMat, sexo, fechaNac, celular, telef, direccion, red, 'idUsuario : '+idUsuario)

            const res = await axios.post(url.url + '/pacientes/registro', {
                token: token,
                ci: ci.campo,
                nombre: nombre.campo,
                apellido1: apellidoPat.campo,
                apellido1: apellidoMat.campo,
                sexo: sexo.campo,
                fechaNac: fechaNac.campo,
                celular: celular.campo,
                telef: telef.campo,
                direccion: direccion.campo,
                reds: reds.campo,
                id: idUsuario
            })

            if (res.data.status === 6) {
                // console.log("estamos saliendo por en error")
                auth.logout()
            } else {
                return res
            }
        }

        // modificar registro
        if (n === 3) {
            console.log(" datos en el servicio: ", id, ci, nombre, apellidoPat, apellidoMat, sexo, fechaNac, celular, telef, direccion, red, idUsuario, validacion, estado)
            const res = await axios.post(url.url + '/pacientes/actualizar',
                {
                    token: token,
                    id: id.campo,
                    ci: ci.campo,
                    nombre: nombre.campo,
                    apellido1: apellidoPat.campo,
                    apellido2: apellidoMat.campo,
                    sexo: sexo.campo,
                    celular: celular.campo,
                    fechaNac: fechaNac.campo,
                    telefono: telef.campo,
                    direccion: direccion.campo,
                    id_red: reds.campo,
                    validacion: validacion.campo,
                    estado: estado.campo,
                    idPersonal: idUsuario
                }
            )
            if (res.data.status === 6) {

                console.log("fallo en la peticion ")
                auth.logout()

            } else {
                return res
            }
        }

        // eliminar registro
        if (n === 4) {

            console.log("datos paso a la funcion", id)

            const res = await axios.post(url.url + '/pacientes/eliminar',
                {
                    token: token,
                    id: id.campo
                }
            )

            // console.log(res.data, 'mensaje errorrsingo')
            if (res.data.status === 6) {

                auth.logout()

            } else {
                return res
            }
        }

    } else {
        console.log("algo salio mal")
        auth.logout()
    }

}
const Listas = async (n, auth, inicio = 0, limite = 0, ci='') => {

    const token = localStorage.getItem("token")


    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },

        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )



    if (token != null) {

        if (n === 1) {

            const res = await axios.post(url.url + '/pacientes/milista', {

                "token": token,
                inicio: inicio,
                limite: limite


            })

            if (res.data.status === 6) {
                auth.logout()
            } else {
                return res
            }
        }
        if (n === 2) {

            const res = await axios.post(url.url + '/pacientes/lista', {

                "token": token,
                inicio: inicio,
                limite: limite


            })

            if (res.data.status === 6) {
                auth.logout()
            } else {
                return res
            }
        }

        if (n === 3) {

            const res = await axios.post(url.url + '/pacientes/buscar', {

                "token": token,
                ci:ci.campo
            })

            if (res.data.status === 6) {
                auth.logout()
            } else {
                return res
            }
        }

    }
}
export { HttpPaciente, Listas }