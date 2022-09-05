import axios from 'axios'
import url from '../../Auth/varEntorno'
import Cookies from 'universal-cookie'

//peticiones al servidor
const cookie = new Cookies()

export const red = async (n, auth, datos = '') => {

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

    if (token!= null) {

        //listar registro
        if (n === 1) {

            const res = await axios.post(url.url + '/red/lista', 
            {
                
                "token": token
                
            })
            // console.log(res.data.status, 'estadodel servidor')
            if (res.data.status === 6 || res.data.status === 2) { 
                auth.logout()
                
            } else {
                return res
            }
        }

        // insertar registro
        if (n === 2) {

            const res = await axios.post(url.url + '/red/registro', { user: token, nombre: datos.nombre })

            // console.log(res.data, 'mensaje errorrsingo')
            if (res.data.status === 6 || res.data.status === 2) {

                auth.logout()
                
            } else {
                return res
            }
        }

        // modificar registro
        if (n === 3) {

            const res = await axios.post(url.url + '/red/actualizar',
                {
                    token: token,
                    id: datos.id,
                    nombre: datos.nombre 
                }
            )

            // console.log(res.data, 'mensaje errorrsingo')
            if (res.data.status === 6 || res.data.status === 2) {

                auth.logout()

            } else {
                return res
            }
        }

        // eliminar registro
        if (n === 4) {

            const res = await axios.post(url.url + '/red/eliminar',
                {
                    user: token,
                    id: datos.id,
                }
            )

            // console.log(res.data, 'mensaje errorrsingo')
            if (res.data.status === 6 || res.data.status === 2) {

                auth.logout()

            } else {
                return res
            }
        }

        // buscar registro
        if (n === 5) {

            const res = await axios.post(url.url + '/red/buscar',
                {
                    user: token,
                    nombre: datos.nombre,
                }
            )

            // console.log(res.data, 'mensaje errorrsingo')
            if (res.data.status === 6 || res.data.status === 2) {

                auth.logout()

            } else {
                return res
            }
        }

    } else {

        auth.logout()
    }

}
